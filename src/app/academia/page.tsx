import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Academia = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <main className="max-w-6xl mx-auto px-6 py-16">
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Research Interests</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              My research focuses on artificial intelligence, machine learning,
              natural language processing, and data-driven modeling for
              healthcare and environmental systems. I am particularly interested
              in developing methods that are both computationally efficient and
              interpretable, enabling practitioners to understand and trust AI
              systems in critical applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Large-scale language model adaptation and fine-tuning',
                'Interpretable deep learning and explainable AI',
                'Multi-modal computer vision and cross-domain learning',
                'Federated learning and privacy-preserving machine learning',
                'AI for biomedical and environmental applications',
                'Efficient neural architecture design and optimization',
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="publications" className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Recent Publications</h2>
            <div className="space-y-2">
              {[
                {
                  conf: 'NeurIPS',
                  title:
                    'Efficient Foundation Model Adaptation for Scientific Discovery',
                  year: 2024,
                  link: '',
                },
                {
                  conf: 'ICCV',
                  title:
                    'Cross-Domain Visual Reasoning via Generative Alignment',
                  year: 2024,
                  link: '',
                },
                {
                  conf: 'ICML',
                  title: 'Adaptive Learning for Robust Multi-Modal AI Systems',
                  year: 2023,
                  link: '',
                },
                {
                  conf: 'ACL',
                  title:
                    'Context-Aware Language Understanding in Low-Resource Settings',
                  year: 2023,
                  link: '',
                },
                {
                  conf: 'CVPR',
                  title:
                    'Federated Learning for Privacy-Preserving Computer Vision',
                  year: 2023,
                  link: '',
                },
                {
                  conf: 'AAAI',
                  title:
                    'Interpretable Decision Trees via Neural Network Distillation',
                  year: 2022,
                  link: '',
                },
                {
                  conf: 'JMLR',
                  title:
                    'Scalable Bayesian Optimization for Hyperparameter Tuning',
                  year: 2022,
                  link: '',
                },
                {
                  conf: 'IEEE TPAMI',
                  title:
                    'Deep Learning for Medical Image Segmentation: A Survey',
                  year: 2022,
                  link: '',
                },
              ].map((pub, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-semibold text-primary min-w-fit">
                    [{pub.conf}]
                  </span>
                  <p className="font-medium">{pub.title},</p>
                  <a
                    href={pub.link}
                    className="!text-blue-600 hover:underline text-sm"
                    target="_blank"
                    rel="norefferer"
                  >
                    Link,
                  </a>

                  <p className="text-sm text-muted-foreground">{pub.year}.</p>
                </div>
              ))}
            </div>
          </section>

          <section id="software" className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Software & Tools</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'AdaptiveLearn',
                  desc: 'A modular active learning framework for scalable AI experimentation and model training.',
                },
                {
                  name: 'VisionPlus',
                  desc: 'A comprehensive computer vision toolkit for cross-domain model transfer and adaptation.',
                },
                {
                  name: 'InterpretML',
                  desc: 'Tools for generating human-interpretable explanations for deep learning models.',
                },
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b border-border last:border-b-0"
                >
                  <h3 className="font-semibold mb-1">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm">{tool.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Service & Reviewing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Journals</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>
                    IEEE Transactions on Neural Networks and Learning Systems
                  </li>
                  <li>Journal of Machine Learning Research (JMLR)</li>
                  <li>Pattern Recognition (Elsevier)</li>
                  <li>
                    ACM Transactions on Intelligent Systems and Technology
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Conferences</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>NeurIPS, ICML, ICCV, CVPR</li>
                  <li>AAAI, IJCAI, ACL</li>
                  <li>ICLR, ECCV, ICCV</li>
                  <li>KDD, SIGMOD</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Research Group</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Alex Rivera',
                  status: 'Ph.D. Candidate, 2023–Present',
                  focus: 'Multimodal AI for scientific data analysis',
                },
                {
                  name: 'Jordan Chen',
                  status: 'Ph.D. Candidate, 2022–Present',
                  focus: 'Federated learning and privacy preservation',
                },
                {
                  name: 'Morgan Taylor',
                  status: 'M.S. Student, 2024–Present',
                  focus: 'Interpretable deep learning methods',
                },
              ].map((student, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b border-border last:border-b-0"
                >
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {student.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Research: {student.focus}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Contact</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                sarah.mitchell@horizon.edu
              </p>
              <p>
                <span className="font-semibold">Office:</span> Tech Hall 214,
                Horizon University
              </p>
              <p>
                <span className="font-semibold">Phone:</span> (555) 123-4567
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Academia
