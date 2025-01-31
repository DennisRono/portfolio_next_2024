import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'

const interBold = fetch(
  new URL(
    '../../../assets/fonts/Volte-Rounded/Volte-Rounded-Semibold.otf',
    import.meta.url
  )
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold

    const { searchParams } = req.nextUrl
    const title = searchParams.get('title')

    if (!title) {
      return new Response('No title provided', { status: 500 })
    }

    const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 1194 1255"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M201.411 1107.82C184.546 1107.33 171.093 1089.38 171.204 1067.54L174.747 368.156C174.839 363.278 175.076 358.463 175.371 353.573C175.626 350.997 175.901 348.321 176.281 345.722C184.27 289.634 222.223 247.26 267.79 247.528C283.768 247.621 298.724 252.976 311.786 262.211C311.863 262.286 311.997 262.387 312.065 262.387L316.764 266.106L335.81 280.78L360.036 299.6L356.946 921.012C356.737 962.307 340.584 998.618 316.028 1020.1C315.446 1020.55 314.883 1021.02 314.368 1021.56L219.329 1101.09C214.513 1105.17 208.72 1107.71 202.523 1107.82L201.411 1107.82Z"
                fill="url(#paint0_linear_205_23)"
              />
              <path
                d="M791.5 696.268L791.5 516.529C791.5 501.104 785.56 486.275 774.913 475.12L511.329 198.967C467.804 153.366 416.367 109.818 353.327 108.54C351.132 108.496 348.876 108.663 346.705 108.992C309.141 114.697 291.577 120.105 270.55 136.512C242.587 158.33 220.886 187.565 205.906 219.712C186.888 260.527 181.228 294.269 176.833 349.469C195.139 289.589 212.757 264.192 254.778 255.185C281.674 249.42 308.479 262.412 327.406 282.36L739.732 716.937C758.389 736.601 791.5 723.38 791.5 696.268Z"
                fill="url(#paint1_linear_205_23)"
              />
              <path
                d="M992.61 109.909C1009.48 110.396 1022.93 128.34 1022.82 150.182L1019.28 849.569C1019.18 854.447 1018.95 859.262 1018.65 864.152C1018.4 866.728 1018.12 869.403 1017.74 872.003C1009.75 928.09 971.799 970.465 926.232 970.197C910.253 970.103 895.297 964.748 882.236 955.514C882.159 955.438 882.024 955.338 881.957 955.337L877.258 951.619L858.212 936.945L833.986 918.124L837.075 296.713C837.285 255.417 853.438 219.107 877.994 197.621C878.576 197.174 879.139 196.702 879.654 196.167L974.693 116.634C979.508 112.559 985.302 110.016 991.499 109.902L992.61 109.909Z"
                fill="url(#paint2_linear_205_23)"
              />
              <path
                d="M402.522 521.457L402.522 701.196C402.522 716.62 408.462 731.45 419.109 742.605L682.693 1018.76C726.218 1064.36 777.655 1107.91 840.695 1109.18C842.89 1109.23 845.146 1109.06 847.317 1108.73C884.88 1103.03 902.445 1097.62 923.472 1081.21C951.434 1059.39 973.136 1030.16 988.116 998.013C1007.13 957.198 1012.79 923.455 1017.19 868.255C998.883 928.135 981.265 953.533 939.244 962.54C912.347 968.305 885.542 955.313 866.616 935.365L454.289 500.787C435.633 481.124 402.522 494.344 402.522 521.457Z"
                fill="url(#paint3_linear_205_23)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_205_23"
                  x1="280.472"
                  y1="262.727"
                  x2="262.51"
                  y2="1053.57"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0088F0" />
                  <stop offset="0.5" stop-color="#2080F1" />
                  <stop offset="1" stop-color="#14A9FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_205_23"
                  x1="217.959"
                  y1="-52.3733"
                  x2="354.042"
                  y2="334.038"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2080F1" />
                  <stop offset="1" stop-color="#14A9FF" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_205_23"
                  x1="913.55"
                  y1="954.998"
                  x2="931.512"
                  y2="164.157"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0088F0" />
                  <stop offset="0.5" stop-color="#2080F1" />
                  <stop offset="1" stop-color="#14A9FF" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_205_23"
                  x1="976.063"
                  y1="1270.1"
                  x2="839.979"
                  y2="883.686"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2080F1" />
                  <stop offset="1" stop-color="#14A9FF" />
                </linearGradient>
              </defs>
            </svg>

            <p tw="text-4xl font-bold ml-2 capitalize font-bold bg-clip-text text-black bg-gradient-to-r from-[#db2777] to-[#9333ea]">
              Dennis Kibet R.
            </p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              BLOG POST
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{siteConfig.url}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{siteConfig.links.github}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    )
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 })
  }
}
