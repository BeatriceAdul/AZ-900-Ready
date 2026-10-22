import type { Topic } from '../types'

export const topics: Topic[] = [
  {
    id: 'cloud-concepts',
    name: 'Cloud Concepts',
    description: 'Cloud models, benefits, service models, availability, scalability and shared responsibility.',
    color: 'blue'
  },
  {
    id: 'azure-architecture',
    name: 'Azure Architecture & Services',
    description: 'Regions, resources, compute, networking, storage and identity fundamentals.',
    color: 'indigo'
  },
  {
    id: 'azure-governance',
    name: 'Azure Management & Governance',
    description: 'Management tools, governance, monitoring, cost management, RBAC and policy.',
    color: 'violet'
  }
]
