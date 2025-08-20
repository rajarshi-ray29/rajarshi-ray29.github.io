---
title: "IBM, AI Engineer in Hybrid Cloud"
excerpt: |
  - Published a paper documenting microservices deployment across x86 and s390x architectures using OpenShift Pipelines.  
  - Engineered a JMeter-based pipeline for automated workload testing, achieving a 98% success rate in simulating real-world usage.  
  - Contributed to the WatsonX Challenge by designing an AI Persona–driven synthetic transaction data generation framework.  
  <br/><img src='/images/agentic_ai_framework2.png'>
collection: experience
---

**Timeline:** Summer 2025 (Internship) · Co-op extension approved for Fall 2025  
**Team:** LinuxONE Hybrid Cloud Integration & Test (HCIT)

**Overview**  
Worked on bringing cloud-native workloads to **s390x** and improving reliability, performance, and CI/CD hygiene across containerized microservices. Split time between platform engineering (containers, pipelines, GitOps) and applied AI for test data generation.

Key Projects
------
- **Retail Store Sample App on s390x**  
  Ported the AWS Retail Store Sample App to **s390x** using **Podman** and **OpenShift Pipelines (Tekton)**. Re-authored service **Dockerfiles to Red Hat UBI** images, resolved architecture mismatches, and produced reproducible multi-arch builds.  
  *Result:* Consistent deployments on LinuxONE with clean supply-chain provenance.

- **Workload & Performance Harness**  
  Built a **JMeter** pipeline to generate realistic end-to-end traffic across **Spring Boot** services with **RabbitMQ** and **DynamoDB (local)**. Investigated startup failures (e.g., transient **503**s from local DynamoDB), added readiness/health checks, and tuned backoff/retry.  
  *Result:* Faster regression discovery and improved service startup reliability.

- **Agentic AI for Synthetic Data (WatsonX Challenge)**  
  Designed an **agentic AI** workflow to synthesize diverse transaction data and evaluate coverage/quality, enabling richer test scenarios without PII.  
  *Result:* Broader test coverage and faster scenario iteration.

- **GitOps & Environment Reproducibility**  
  Prototyped **GitOps** practices with **Argo CD** for versioned application and platform state; standardized manifests and promotion flows.  
  *Result:* Repeatable environment rollouts and fewer “works on my cluster” issues.

What I Owned
------
- Containerization for **s390x** (Podman, multi-arch images, UBI base).  
- CI/CD with **Tekton**: build, test, scan, and deploy stages.  
- **Observability & runbooks** for service health and failure modes.  
- Performance test design (**JMeter**) and analysis loops.  
- Cross-team debugging (networking, dependencies, startup order).

Tech Stack
------
**Podman**, **OpenShift (Tekton)**, **Kubernetes**, **Argo CD (GitOps)**, **JMeter**, **Spring Boot**, **RabbitMQ**, **DynamoDB (local)**, **Linux (s390x)**, **RHEL/UBI**, **YAML/Kustomize**, **Git/GitHub**

Impact
------
- Enabled reliable deployment of a multi-service app on **LinuxONE (s390x)**.  
- Reduced container build friction with standardized **UBI-based** images.  
- Improved startup stability and performance visibility with a reusable load harness.  
- Accelerated test data generation with **agentic AI**, increasing scenario diversity.
