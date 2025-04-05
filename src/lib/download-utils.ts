/**
 * Utility functions for handling file downloads
 */

// Type for download options
export interface DownloadOptions {
    url: string
    filename: string
    onProgress?: (progress: number) => void
    onError?: (error: Error) => void
    onSuccess?: () => void
    useCache?: boolean
  }
  
  // Cache for downloaded files
  const downloadCache = new Map<string, Blob>()
  
  /**
   * Downloads a file from a URL and saves it to the user's device
   *
   * @param options Download options
   * @returns Promise that resolves when download is complete
   */
  export async function downloadFile({
    url,
    filename,
    onProgress,
    onError,
    onSuccess,
    useCache = true,
  }: DownloadOptions): Promise<void> {
    try {
      // Check cache first if enabled
      if (useCache && downloadCache.has(url)) {
        const cachedBlob = downloadCache.get(url)
        if (cachedBlob) {
          saveFile(cachedBlob, filename)
          onSuccess?.()
          return
        }
      }
  
      // Fetch with progress tracking
      const blob = await fetchWithProgress(url, onProgress)
  
      // Cache the blob if caching is enabled
      if (useCache) {
        downloadCache.set(url, blob)
      }
  
      // Save the file
      saveFile(blob, filename)
  
      // Call success callback
      onSuccess?.()
    } catch (error) {
      console.error("Download failed:", error)
      onError?.(error instanceof Error ? error : new Error("Download failed"))
    }
  }
  
  /**
   * Fetches a file with progress tracking
   *
   * @param url URL to fetch
   * @param onProgress Progress callback
   * @returns Promise that resolves to a Blob
   */
  async function fetchWithProgress(url: string, onProgress?: (progress: number) => void): Promise<Blob> {
    // If we can't track progress, fall back to regular fetch
    if (!onProgress || typeof Response === "undefined" || !("body" in Response.prototype)) {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.blob()
    }
  
    // Fetch with progress tracking
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  
    // Get content length from headers if available
    const contentLength = response.headers.get("Content-Length")
    const total = contentLength ? Number.parseInt(contentLength, 10) : 0
  
    // Create a reader from the response body
    const reader = response.body!.getReader()
    const chunks: Uint8Array[] = []
    let receivedLength = 0
  
    // Read the data
    while (true) {
      const { done, value } = await reader.read()
  
      if (done) {
        break
      }
  
      chunks.push(value)
      receivedLength += value.length
  
      if (total > 0) {
        onProgress(Math.min(receivedLength / total, 1))
      }
    }
  
    // Concatenate chunks into a single Uint8Array
    const chunksAll = new Uint8Array(receivedLength)
    let position = 0
    for (const chunk of chunks) {
      chunksAll.set(chunk, position)
      position += chunk.length
    }
  
    // Convert to blob
    return new Blob([chunksAll])
  }
  
  /**
   * Saves a blob as a file
   *
   * @param blob Blob to save
   * @param filename Filename to use
   */
  function saveFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
  
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 100)
  }
  
  