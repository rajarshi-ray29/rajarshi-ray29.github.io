---
title: "IUDX, Research & Development Intern — IISc Bangalore"
excerpt: |
  - Built a secure pneumonia-classification workflow with **AMD SEV-SNP**, improving data privacy and code integrity and achieving ~20% better performance vs **Intel SGX**/**AWS Nitro**.  
  - Designed a confidential medical-image analysis pipeline integrating **TPM-backed storage** and **remote inference**.  
  - Shipped production-ready components using **TensorFlow/Keras**, **C++**, **Docker**, and cloud infrastructure.  
  <br/><img src='/images/p3dx_workflow.jpeg'>
collection: experience
---

IUDX, Indian Institute of Science (IISc), Bangalore, KA, India
======
**Role:** Research & Development Intern  
**Timeline:** January 2024 – July 2024

Top Highlights
------
- Developed a secure workflow for **pneumonia classification** using **AMD SEV-SNP**, with ~**20% performance** improvement compared to similar confidential-computing stacks (e.g., **Intel SGX**, **AWS Nitro**).  
- Designed a **confidential medical-image analysis** pipeline that combines **TPM-based storage** with **remote inference**, enabling privacy-preserving deployment.  
- Leveraged **TensorFlow**, **Keras**, **C++**, **Docker**, and **cloud** services to deliver **production-ready**, secure solutions.

Overview
======
Worked at the intersection of **confidential computing** and **medical imaging** to build privacy-preserving ML systems. Focused on enclave-backed execution, trusted storage, and remote inference so hospitals and research partners can use ML without exposing sensitive patient data.

Key Projects
------
- **SEV-SNP Secure ML Pipeline**  
  Implemented data ingestion, preprocessing, model execution, and result return fully within **SEV-SNP** VMs; integrated attestation and integrity checks.  
  *Result:* End-to-end protected workflow with measurable performance gains.

- **TPM-Backed Storage + Remote Inference**  
  Bound encryption keys to platform state via **TPM 2.0** and served inference remotely over mutually authenticated channels.  
  *Result:* Confidentiality at rest and in use, with operational flexibility.

- **Benchmarking & Optimization**  
  Profiled **SEV-SNP** against **SGX/Nitro** baselines; optimized I/O, batching, and container/runtime settings.  
  *Result:* ~**20%** uplift while maintaining security guarantees.

What I Owned
------
- Enclave/TEE configuration, **attestation** flows, and policy enforcement.  
- Secure key management (TPM-bound keys), storage encryption, and access control.  
- Containerization (**Docker**), CI artifacts, and deployment scripts.  
- Performance experiments and documentation for reproducible evaluations.

Tech Stack
------
**AMD SEV-SNP**, **TPM 2.0**, **TensorFlow**, **Keras**, **Python**, **C++**, **Docker**, **Linux**, **Git**, **Cloud infrastructure**

Impact
------
- Demonstrated that **confidential ML** can be both **private and fast** on real workloads.  
- Reduced integration risk with documented **attestation** and **key-management** patterns.  
- Delivered artifacts and benchmarks that accelerated downstream adoption.
