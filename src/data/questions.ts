import type { Question } from '../types'

export const questions: Question[] = [
  {
    "id": "cc-1",
    "topicId": "cloud-concepts",
    "question": "What does the consumption-based cloud model primarily mean?",
    "options": [
      "Pay only for resources you use",
      "Buy all hardware before use",
      "Pay a fixed price forever",
      "Use cloud resources without measurement"
    ],
    "answer": 0,
    "explanation": "Consumption-based services charge according to usage.",
    "simpleExplanation": "Think of electricity: you pay for what you consume.",
    "memoryTip": "Use what you need, pay for what you use.",
    "difficulty": "Beginner",
    "concept": "Consumption model"
  },
  {
    "id": "cc-2",
    "topicId": "cloud-concepts",
    "question": "Which cloud model gives an organization the most direct control over physical infrastructure?",
    "options": [
      "SaaS",
      "PaaS",
      "IaaS",
      "FaaS"
    ],
    "answer": 2,
    "explanation": "IaaS provides virtualized infrastructure while the provider operates the underlying physical datacenter.",
    "simpleExplanation": "IaaS gives you more infrastructure responsibility.",
    "memoryTip": "IaaS = infrastructure.",
    "difficulty": "Beginner",
    "concept": "IaaS"
  },
  {
    "id": "cc-3",
    "topicId": "cloud-concepts",
    "question": "Which service model usually requires the least customer management?",
    "options": [
      "IaaS",
      "PaaS",
      "SaaS",
      "Colocation"
    ],
    "answer": 2,
    "explanation": "SaaS provides a complete application managed largely by the provider.",
    "simpleExplanation": "With SaaS, you mainly use the finished software.",
    "memoryTip": "SaaS = software ready to use.",
    "difficulty": "Beginner",
    "concept": "SaaS"
  },
  {
    "id": "cc-4",
    "topicId": "cloud-concepts",
    "question": "What is elasticity in cloud computing?",
    "options": [
      "The ability to automatically add or remove resources as demand changes",
      "A guarantee that a service never fails",
      "Encrypting every file",
      "Moving a server to another country"
    ],
    "answer": 0,
    "explanation": "Elasticity is the ability to dynamically adjust capacity as demand changes.",
    "simpleExplanation": "Resources can stretch up or down with demand.",
    "memoryTip": "Elastic = expands and contracts.",
    "difficulty": "Beginner",
    "concept": "Elasticity"
  },
  {
    "id": "cc-5",
    "topicId": "cloud-concepts",
    "question": "What does scalability describe?",
    "options": [
      "The ability of a system to handle increased workload by adding capacity",
      "The ability to encrypt data",
      "The ability to delete resources",
      "The ability to change a password"
    ],
    "answer": 0,
    "explanation": "Scalability is the ability to increase capacity to meet growing workload.",
    "simpleExplanation": "A scalable system can grow when demand grows.",
    "memoryTip": "Scale = grow capacity.",
    "difficulty": "Beginner",
    "concept": "Scalability"
  },
  {
    "id": "cc-6",
    "topicId": "cloud-concepts",
    "question": "Which is a typical benefit of cloud computing?",
    "options": [
      "Paying for unused physical servers",
      "Rapid deployment of resources",
      "Needing a datacenter for every application",
      "Removing all security responsibilities"
    ],
    "answer": 1,
    "explanation": "Cloud platforms can provision resources quickly.",
    "simpleExplanation": "Cloud lets you create resources much faster than buying hardware.",
    "memoryTip": "Cloud = faster provisioning.",
    "difficulty": "Beginner",
    "concept": "Cloud benefits"
  },
  {
    "id": "cc-7",
    "topicId": "cloud-concepts",
    "question": "Which model combines on-premises infrastructure with public cloud resources?",
    "options": [
      "Public cloud",
      "Private cloud",
      "Hybrid cloud",
      "Community cloud"
    ],
    "answer": 2,
    "explanation": "Hybrid cloud connects or combines private/on-premises environments with public cloud services.",
    "simpleExplanation": "Part stays private and part uses public cloud.",
    "memoryTip": "Hybrid = mixture.",
    "difficulty": "Beginner",
    "concept": "Cloud models"
  },
  {
    "id": "cc-8",
    "topicId": "cloud-concepts",
    "question": "What is a public cloud?",
    "options": [
      "Cloud infrastructure offered for use by multiple customers",
      "A datacenter owned only by one company",
      "A local office network",
      "A personal laptop"
    ],
    "answer": 0,
    "explanation": "Public cloud providers offer shared physical infrastructure to many customers with logical isolation.",
    "simpleExplanation": "Many customers use a provider's cloud platform.",
    "memoryTip": "Public cloud = provider-operated shared infrastructure.",
    "difficulty": "Beginner",
    "concept": "Cloud models"
  },
  {
    "id": "cc-9",
    "topicId": "cloud-concepts",
    "question": "What is a private cloud?",
    "options": [
      "Cloud infrastructure dedicated to one organization",
      "Any free cloud account",
      "A public website",
      "A home Wi-Fi network"
    ],
    "answer": 0,
    "explanation": "A private cloud is dedicated to one organization.",
    "simpleExplanation": "Private means dedicated to one organization.",
    "memoryTip": "Private = dedicated.",
    "difficulty": "Beginner",
    "concept": "Cloud models"
  },
  {
    "id": "cc-10",
    "topicId": "cloud-concepts",
    "question": "What does high availability aim to provide?",
    "options": [
      "A service that remains accessible despite certain failures",
      "The cheapest possible storage",
      "A single server with no backup",
      "Unlimited storage"
    ],
    "answer": 0,
    "explanation": "High availability uses redundancy and design techniques to reduce downtime.",
    "simpleExplanation": "Keep the service available even when something fails.",
    "memoryTip": "High availability = stay available.",
    "difficulty": "Beginner",
    "concept": "Availability"
  },
  {
    "id": "cc-11",
    "topicId": "cloud-concepts",
    "question": "What is reliability concerned with?",
    "options": [
      "Consistent operation and recovery from failures",
      "Only the price of a resource",
      "Changing a user interface",
      "Buying hardware"
    ],
    "answer": 0,
    "explanation": "Reliability focuses on a system's ability to operate consistently and recover from failures.",
    "simpleExplanation": "Reliable systems keep working and recover well.",
    "memoryTip": "Reliable = dependable.",
    "difficulty": "Beginner",
    "concept": "Reliability"
  },
  {
    "id": "cc-12",
    "topicId": "cloud-concepts",
    "question": "What does predictability in cloud operations help with?",
    "options": [
      "Forecasting performance and costs",
      "Deleting all resources",
      "Removing monitoring",
      "Avoiding all automation"
    ],
    "answer": 0,
    "explanation": "Cloud tools and pricing models can help organizations estimate resource behavior and spending.",
    "simpleExplanation": "Predictability helps you plan performance and costs.",
    "memoryTip": "Predict = plan ahead.",
    "difficulty": "Intermediate",
    "concept": "Predictability"
  },
  {
    "id": "cc-13",
    "topicId": "cloud-concepts",
    "question": "What is the shared responsibility model?",
    "options": [
      "A model dividing security and management responsibilities between provider and customer",
      "A billing discount",
      "A networking protocol",
      "A backup format"
    ],
    "answer": 0,
    "explanation": "The provider and customer have different responsibilities depending on the service.",
    "simpleExplanation": "Cloud security is shared between provider and customer.",
    "memoryTip": "Shared = both sides have duties.",
    "difficulty": "Beginner",
    "concept": "Shared responsibility"
  },
  {
    "id": "cc-14",
    "topicId": "cloud-concepts",
    "question": "In a typical SaaS service, who manages the underlying physical datacenter?",
    "options": [
      "The customer",
      "The cloud provider",
      "Every end user",
      "The internet provider"
    ],
    "answer": 1,
    "explanation": "The SaaS provider manages the infrastructure supporting the application.",
    "simpleExplanation": "You use the software while the provider handles most infrastructure.",
    "memoryTip": "SaaS shifts more management to provider.",
    "difficulty": "Beginner",
    "concept": "Shared responsibility"
  },
  {
    "id": "cc-15",
    "topicId": "cloud-concepts",
    "question": "Which cloud concept describes the ability to access resources over a network when needed?",
    "options": [
      "On-demand access",
      "Manual procurement",
      "Physical isolation",
      "Static hosting"
    ],
    "answer": 0,
    "explanation": "Cloud resources are commonly provisioned on demand through portals, APIs or automation.",
    "simpleExplanation": "You can request resources when you need them.",
    "memoryTip": "On demand = when needed.",
    "difficulty": "Beginner",
    "concept": "Cloud characteristics"
  },
  {
    "id": "cc-16",
    "topicId": "cloud-concepts",
    "question": "What is an economy of scale?",
    "options": [
      "Lower per-unit cost achieved by operating at large scale",
      "A rule requiring small servers",
      "A security policy",
      "A database backup"
    ],
    "answer": 0,
    "explanation": "Large cloud providers can spread infrastructure costs across many customers.",
    "simpleExplanation": "Large-scale operations can reduce unit costs.",
    "memoryTip": "Scale can reduce unit cost.",
    "difficulty": "Intermediate",
    "concept": "Cloud economics"
  },
  {
    "id": "cc-17",
    "topicId": "cloud-concepts",
    "question": "Which situation is a good example of agility?",
    "options": [
      "Deploying a test environment quickly for a new idea",
      "Waiting months to purchase a server",
      "Manually replacing every laptop",
      "Disabling automation"
    ],
    "answer": 0,
    "explanation": "Cloud resources can be provisioned quickly, allowing faster experimentation.",
    "simpleExplanation": "Agility means moving quickly.",
    "memoryTip": "Agile = quick to change.",
    "difficulty": "Beginner",
    "concept": "Agility"
  },
  {
    "id": "cc-18",
    "topicId": "cloud-concepts",
    "question": "What does governance primarily help an organization do?",
    "options": [
      "Establish rules and controls for resources",
      "Increase screen brightness",
      "Write application code",
      "Replace all networks"
    ],
    "answer": 0,
    "explanation": "Governance establishes policies, controls and standards for how resources are used.",
    "simpleExplanation": "Governance keeps cloud use aligned with organizational rules.",
    "memoryTip": "Governance = rules.",
    "difficulty": "Beginner",
    "concept": "Governance"
  },
  {
    "id": "cc-19",
    "topicId": "cloud-concepts",
    "question": "Which term best describes designing systems to continue operating when components fail?",
    "options": [
      "Resilience",
      "Compression",
      "Virtualization",
      "Licensing"
    ],
    "answer": 0,
    "explanation": "Resilience is the ability to withstand and recover from failures.",
    "simpleExplanation": "Resilient systems bounce back from problems.",
    "memoryTip": "Resilience = recover.",
    "difficulty": "Intermediate",
    "concept": "Resilience"
  },
  {
    "id": "cc-20",
    "topicId": "cloud-concepts",
    "question": "Why is cloud automation useful?",
    "options": [
      "It can make repeated operations faster and more consistent",
      "It always eliminates security controls",
      "It requires more manual work",
      "It prevents monitoring"
    ],
    "answer": 0,
    "explanation": "Automation reduces repetitive manual work and can improve consistency.",
    "simpleExplanation": "Automate repeated tasks instead of doing them by hand.",
    "memoryTip": "Automate = repeat consistently.",
    "difficulty": "Beginner",
    "concept": "Automation"
  },
  {
    "id": "as-1",
    "topicId": "azure-architecture",
    "question": "What is an Azure region?",
    "options": [
      "A geographic area containing one or more Azure datacenters",
      "A user account",
      "A billing invoice",
      "A type of virtual machine"
    ],
    "answer": 0,
    "explanation": "An Azure region is a geographic area containing Azure datacenters.",
    "simpleExplanation": "A region is a geographic location where Azure resources can run.",
    "memoryTip": "Region = geographic area.",
    "difficulty": "Beginner",
    "concept": "Regions"
  },
  {
    "id": "as-2",
    "topicId": "azure-architecture",
    "question": "What is an availability zone?",
    "options": [
      "A physically separate location within an Azure region",
      "A subscription plan",
      "A DNS record",
      "A user role"
    ],
    "answer": 0,
    "explanation": "Availability zones are physically separate locations within supported Azure regions, with independent power, cooling and networking.",
    "simpleExplanation": "Zones help protect workloads from datacenter-level failures.",
    "memoryTip": "Zone = separate location inside a region.",
    "difficulty": "Intermediate",
    "concept": "Availability zones"
  },
  {
    "id": "as-3",
    "topicId": "azure-architecture",
    "question": "What is an Azure resource group?",
    "options": [
      "A logical container for related Azure resources",
      "A physical server rack",
      "A password store",
      "A billing card"
    ],
    "answer": 0,
    "explanation": "Resource groups logically organize resources that share a lifecycle or management context.",
    "simpleExplanation": "Think of a resource group as a folder for related resources.",
    "memoryTip": "Resource group = logical folder.",
    "difficulty": "Beginner",
    "concept": "Resource groups"
  },
  {
    "id": "as-4",
    "topicId": "azure-architecture",
    "question": "What is an Azure subscription used for?",
    "options": [
      "Providing a billing and management boundary for Azure resources",
      "Replacing every virtual network",
      "Storing only images",
      "Creating passwords"
    ],
    "answer": 0,
    "explanation": "Subscriptions are management and billing boundaries in Azure.",
    "simpleExplanation": "A subscription groups resources for management and billing.",
    "memoryTip": "Subscription = management/billing boundary.",
    "difficulty": "Beginner",
    "concept": "Subscriptions"
  },
  {
    "id": "as-5",
    "topicId": "azure-architecture",
    "question": "What is a management group used for?",
    "options": [
      "Organizing multiple Azure subscriptions for governance",
      "Hosting a website",
      "Creating a VM disk",
      "Encrypting a password"
    ],
    "answer": 0,
    "explanation": "Management groups allow governance policies and organization across multiple subscriptions.",
    "simpleExplanation": "It is a higher-level container above subscriptions.",
    "memoryTip": "Management group = subscriptions above.",
    "difficulty": "Intermediate",
    "concept": "Management groups"
  },
  {
    "id": "as-6",
    "topicId": "azure-architecture",
    "question": "Which Azure service provides virtual machines?",
    "options": [
      "Azure Virtual Machines",
      "Azure DNS",
      "Azure Policy",
      "Azure Monitor"
    ],
    "answer": 0,
    "explanation": "Azure Virtual Machines provides scalable compute instances.",
    "simpleExplanation": "A VM is a virtual computer in Azure.",
    "memoryTip": "VM = virtual computer.",
    "difficulty": "Beginner",
    "concept": "Compute"
  },
  {
    "id": "as-7",
    "topicId": "azure-architecture",
    "question": "Which Azure service is designed for running web applications without managing the underlying servers?",
    "options": [
      "Azure App Service",
      "Azure Storage",
      "Azure DNS",
      "Azure Policy"
    ],
    "answer": 0,
    "explanation": "App Service is a managed platform for hosting web apps and APIs.",
    "simpleExplanation": "You deploy the app while Azure manages much of the platform.",
    "memoryTip": "App Service = managed web hosting.",
    "difficulty": "Beginner",
    "concept": "App Service"
  },
  {
    "id": "as-8",
    "topicId": "azure-architecture",
    "question": "What is Azure Functions?",
    "options": [
      "A serverless compute service for event-driven code",
      "A physical firewall",
      "A storage account type",
      "A subscription boundary"
    ],
    "answer": 0,
    "explanation": "Azure Functions runs code in response to events without requiring you to manage servers.",
    "simpleExplanation": "Run small pieces of code when events happen.",
    "memoryTip": "Functions = event-driven code.",
    "difficulty": "Beginner",
    "concept": "Serverless"
  },
  {
    "id": "as-9",
    "topicId": "azure-architecture",
    "question": "Which Azure service provides managed containers?",
    "options": [
      "Azure Container Instances",
      "Azure Resource Manager only",
      "Azure Policy",
      "Azure Advisor"
    ],
    "answer": 0,
    "explanation": "Azure Container Instances runs containers without requiring management of virtual machines.",
    "simpleExplanation": "It is a simple way to run containers.",
    "memoryTip": "ACI = run a container simply.",
    "difficulty": "Intermediate",
    "concept": "Containers"
  },
  {
    "id": "as-10",
    "topicId": "azure-architecture",
    "question": "Which Azure service is commonly used for object/blob storage?",
    "options": [
      "Azure Blob Storage",
      "Azure Virtual Network",
      "Azure DNS",
      "Azure Advisor"
    ],
    "answer": 0,
    "explanation": "Blob Storage stores large amounts of unstructured object data.",
    "simpleExplanation": "Blobs are objects such as files, images and backups.",
    "memoryTip": "Blob = object storage.",
    "difficulty": "Beginner",
    "concept": "Storage"
  },
  {
    "id": "as-11",
    "topicId": "azure-architecture",
    "question": "What does Azure Virtual Network provide?",
    "options": [
      "Private networking for Azure resources",
      "A billing report",
      "Application source code",
      "A password manager"
    ],
    "answer": 0,
    "explanation": "Azure Virtual Network creates an isolated network environment for Azure resources.",
    "simpleExplanation": "It provides private network connectivity in Azure.",
    "memoryTip": "VNet = Azure network.",
    "difficulty": "Beginner",
    "concept": "Networking"
  },
  {
    "id": "as-12",
    "topicId": "azure-architecture",
    "question": "What is Azure DNS used for?",
    "options": [
      "Hosting DNS domains and records",
      "Running virtual machines",
      "Managing costs",
      "Creating users"
    ],
    "answer": 0,
    "explanation": "Azure DNS provides hosting for DNS domains and records.",
    "simpleExplanation": "DNS translates names into network destinations.",
    "memoryTip": "DNS = names and records.",
    "difficulty": "Beginner",
    "concept": "DNS"
  },
  {
    "id": "as-13",
    "topicId": "azure-architecture",
    "question": "Which service can distribute network traffic across multiple backend resources?",
    "options": [
      "Azure Load Balancer",
      "Azure Policy",
      "Azure Advisor",
      "Azure Cost Management"
    ],
    "answer": 0,
    "explanation": "Azure Load Balancer distributes incoming network traffic across backend resources.",
    "simpleExplanation": "It spreads traffic across available resources.",
    "memoryTip": "Load balancer = distribute traffic.",
    "difficulty": "Beginner",
    "concept": "Load balancing"
  },
  {
    "id": "as-14",
    "topicId": "azure-architecture",
    "question": "What is Azure VPN Gateway used for?",
    "options": [
      "Connecting networks using encrypted VPN connections",
      "Creating storage accounts",
      "Analyzing costs",
      "Writing functions"
    ],
    "answer": 0,
    "explanation": "VPN Gateway provides encrypted connections between Azure and other networks.",
    "simpleExplanation": "It can connect a network to Azure through a VPN.",
    "memoryTip": "VPN = encrypted network connection.",
    "difficulty": "Intermediate",
    "concept": "VPN"
  },
  {
    "id": "as-15",
    "topicId": "azure-architecture",
    "question": "Which Azure service provides managed relational database capabilities?",
    "options": [
      "Azure SQL Database",
      "Azure DNS",
      "Azure Functions",
      "Azure Policy"
    ],
    "answer": 0,
    "explanation": "Azure SQL Database is a managed relational database service.",
    "simpleExplanation": "It provides SQL database capabilities without managing the underlying database servers.",
    "memoryTip": "Azure SQL = managed relational database.",
    "difficulty": "Beginner",
    "concept": "Databases"
  },
  {
    "id": "as-16",
    "topicId": "azure-architecture",
    "question": "What is Microsoft Entra ID primarily used for?",
    "options": [
      "Identity and access management",
      "Object storage",
      "Traffic distribution",
      "Cost calculation"
    ],
    "answer": 0,
    "explanation": "Microsoft Entra ID provides identity and access capabilities.",
    "simpleExplanation": "It helps manage identities and access to resources.",
    "memoryTip": "Entra ID = identity.",
    "difficulty": "Beginner",
    "concept": "Identity"
  },
  {
    "id": "as-17",
    "topicId": "azure-architecture",
    "question": "Why would an organization use Azure region pairs?",
    "options": [
      "To support certain disaster-recovery and platform-resilience strategies",
      "To increase password length",
      "To replace all resource groups",
      "To store DNS records only"
    ],
    "answer": 0,
    "explanation": "Azure pairs certain regions for platform resilience and disaster-recovery planning.",
    "simpleExplanation": "Region pairs can support resilience planning.",
    "memoryTip": "Pairs = resilience planning.",
    "difficulty": "Intermediate",
    "concept": "Region pairs"
  },
  {
    "id": "as-18",
    "topicId": "azure-architecture",
    "question": "What is an Azure resource?",
    "options": [
      "A manageable item such as a VM, storage account or database",
      "Only a physical datacenter",
      "A user password",
      "A billing receipt"
    ],
    "answer": 0,
    "explanation": "Resources are individual services or components managed in Azure.",
    "simpleExplanation": "A resource is something you create and manage in Azure.",
    "memoryTip": "Resource = thing you manage.",
    "difficulty": "Beginner",
    "concept": "Resources"
  },
  {
    "id": "as-19",
    "topicId": "azure-architecture",
    "question": "Which service is best associated with content delivery close to users?",
    "options": [
      "Azure Front Door",
      "Azure Policy",
      "Azure Resource Groups",
      "Azure Cost Management"
    ],
    "answer": 0,
    "explanation": "Azure Front Door provides global application delivery capabilities including routing and acceleration.",
    "simpleExplanation": "It helps deliver applications globally.",
    "memoryTip": "Front Door = global entry point.",
    "difficulty": "Advanced",
    "concept": "Application delivery"
  },
  {
    "id": "as-20",
    "topicId": "azure-architecture",
    "question": "What is Azure Resource Manager?",
    "options": [
      "The deployment and management layer for Azure resources",
      "A password vault",
      "A physical datacenter",
      "A DNS registrar"
    ],
    "answer": 0,
    "explanation": "Azure Resource Manager provides a management layer for deploying and organizing Azure resources.",
    "simpleExplanation": "ARM is the management layer behind Azure resources.",
    "memoryTip": "ARM = management layer.",
    "difficulty": "Intermediate",
    "concept": "Resource management"
  },
  {
    "id": "ag-1",
    "topicId": "azure-governance",
    "question": "Which Azure tool provides personalized recommendations for reliability, security, performance and cost?",
    "options": [
      "Azure Advisor",
      "Azure DNS",
      "Azure Functions",
      "Azure Storage"
    ],
    "answer": 0,
    "explanation": "Azure Advisor analyzes resources and provides recommendations.",
    "simpleExplanation": "Advisor gives recommendations.",
    "memoryTip": "Advisor = advice.",
    "difficulty": "Beginner",
    "concept": "Advisor"
  },
  {
    "id": "ag-2",
    "topicId": "azure-governance",
    "question": "Which service monitors Azure resources and applications?",
    "options": [
      "Azure Monitor",
      "Azure Policy",
      "Azure DNS",
      "Azure Storage"
    ],
    "answer": 0,
    "explanation": "Azure Monitor collects and analyzes telemetry from Azure and other environments.",
    "simpleExplanation": "Monitor helps you observe performance and health.",
    "memoryTip": "Monitor = observe.",
    "difficulty": "Beginner",
    "concept": "Monitoring"
  },
  {
    "id": "ag-3",
    "topicId": "azure-governance",
    "question": "What does Azure Service Health provide?",
    "options": [
      "Personalized information about Azure service issues that affect you",
      "A database engine",
      "A web hosting platform",
      "A password manager"
    ],
    "answer": 0,
    "explanation": "Service Health provides information about service incidents, planned maintenance and health relevant to your resources.",
    "simpleExplanation": "It tells you about Azure service events that matter to you.",
    "memoryTip": "Service Health = service status for you.",
    "difficulty": "Beginner",
    "concept": "Service Health"
  },
  {
    "id": "ag-4",
    "topicId": "azure-governance",
    "question": "What is Azure Policy used for?",
    "options": [
      "Enforcing organizational standards and assessing compliance",
      "Running virtual machines",
      "Storing images",
      "Creating DNS records"
    ],
    "answer": 0,
    "explanation": "Azure Policy evaluates resources against organizational rules and can enforce standards.",
    "simpleExplanation": "Policy is about rules and compliance.",
    "memoryTip": "Policy = rules.",
    "difficulty": "Beginner",
    "concept": "Azure Policy"
  },
  {
    "id": "ag-5",
    "topicId": "azure-governance",
    "question": "What does Azure role-based access control (RBAC) provide?",
    "options": [
      "Fine-grained access management based on roles",
      "Automatic backups for every service",
      "DNS hosting",
      "Cost forecasting only"
    ],
    "answer": 0,
    "explanation": "Azure RBAC controls who can access Azure resources and what actions they can perform.",
    "simpleExplanation": "RBAC gives permissions based on roles.",
    "memoryTip": "RBAC = role-based permissions.",
    "difficulty": "Beginner",
    "concept": "RBAC"
  },
  {
    "id": "ag-6",
    "topicId": "azure-governance",
    "question": "What is the purpose of a resource lock?",
    "options": [
      "Preventing accidental deletion or modification of protected resources",
      "Increasing CPU speed",
      "Creating users",
      "Encrypting all traffic"
    ],
    "answer": 0,
    "explanation": "Resource locks can help prevent accidental deletion or modification.",
    "simpleExplanation": "A lock protects important resources from unwanted changes.",
    "memoryTip": "Lock = protect from changes.",
    "difficulty": "Beginner",
    "concept": "Resource locks"
  },
  {
    "id": "ag-7",
    "topicId": "azure-governance",
    "question": "Why are Azure tags useful?",
    "options": [
      "Adding metadata to resources for organization, reporting and cost analysis",
      "Encrypting passwords",
      "Running containers",
      "Creating VPNs"
    ],
    "answer": 0,
    "explanation": "Tags add key-value metadata to resources and can support organization and cost reporting.",
    "simpleExplanation": "Tags are labels for resources.",
    "memoryTip": "Tag = label.",
    "difficulty": "Beginner",
    "concept": "Tags"
  },
  {
    "id": "ag-8",
    "topicId": "azure-governance",
    "question": "What does Azure Cost Management help with?",
    "options": [
      "Analyzing and controlling cloud spending",
      "Running DNS",
      "Creating users",
      "Building containers"
    ],
    "answer": 0,
    "explanation": "Cost Management provides tools for analyzing costs, budgets and spending trends.",
    "simpleExplanation": "It helps you understand and control Azure spending.",
    "memoryTip": "Cost Management = spending visibility.",
    "difficulty": "Beginner",
    "concept": "Cost management"
  },
  {
    "id": "ag-9",
    "topicId": "azure-governance",
    "question": "What is an Azure budget?",
    "options": [
      "A spending threshold used to monitor and alert on costs",
      "A network subnet",
      "A virtual machine",
      "A DNS record"
    ],
    "answer": 0,
    "explanation": "Budgets help track spending and can trigger alerts when thresholds are reached.",
    "simpleExplanation": "A budget warns when spending approaches a limit.",
    "memoryTip": "Budget = spending alert.",
    "difficulty": "Beginner",
    "concept": "Budgets"
  },
  {
    "id": "ag-10",
    "topicId": "azure-governance",
    "question": "What is an SLA?",
    "options": [
      "A documented service-level commitment about availability or performance",
      "A storage container",
      "A user password",
      "A resource tag"
    ],
    "answer": 0,
    "explanation": "A service-level agreement defines service commitments such as availability percentages.",
    "simpleExplanation": "SLA = provider service commitment.",
    "memoryTip": "SLA = service promise.",
    "difficulty": "Beginner",
    "concept": "SLAs"
  },
  {
    "id": "ag-11",
    "topicId": "azure-governance",
    "question": "What does Azure Cloud Shell provide?",
    "options": [
      "A browser-accessible command-line environment",
      "A physical server",
      "A database backup",
      "A graphics editor"
    ],
    "answer": 0,
    "explanation": "Cloud Shell provides a browser-based shell with Azure tools.",
    "simpleExplanation": "It gives you command-line access from the browser.",
    "memoryTip": "Cloud Shell = browser terminal.",
    "difficulty": "Beginner",
    "concept": "Cloud Shell"
  },
  {
    "id": "ag-12",
    "topicId": "azure-governance",
    "question": "Which command-line tool is designed for managing Azure resources?",
    "options": [
      "Azure CLI",
      "Azure Paint",
      "Azure Notes",
      "Azure Reader"
    ],
    "answer": 0,
    "explanation": "Azure CLI is a cross-platform command-line tool for Azure.",
    "simpleExplanation": "CLI lets you manage Azure from a terminal.",
    "memoryTip": "CLI = command line.",
    "difficulty": "Beginner",
    "concept": "Azure CLI"
  },
  {
    "id": "ag-13",
    "topicId": "azure-governance",
    "question": "What is Azure PowerShell?",
    "options": [
      "A PowerShell-based set of commands for Azure management",
      "A storage service",
      "A DNS service",
      "A physical appliance"
    ],
    "answer": 0,
    "explanation": "Azure PowerShell provides Azure management cmdlets for PowerShell.",
    "simpleExplanation": "It lets PowerShell users manage Azure.",
    "memoryTip": "PowerShell = Azure cmdlets.",
    "difficulty": "Beginner",
    "concept": "Azure PowerShell"
  },
  {
    "id": "ag-14",
    "topicId": "azure-governance",
    "question": "What does the Azure portal provide?",
    "options": [
      "A web-based interface for managing Azure resources",
      "Only a code editor",
      "Only a database",
      "Only a billing invoice"
    ],
    "answer": 0,
    "explanation": "The Azure portal is a browser-based management interface.",
    "simpleExplanation": "It is the graphical interface for Azure management.",
    "memoryTip": "Portal = web management.",
    "difficulty": "Beginner",
    "concept": "Azure portal"
  },
  {
    "id": "ag-15",
    "topicId": "azure-governance",
    "question": "What is governance in Azure mainly concerned with?",
    "options": [
      "Ensuring resources follow organizational rules and standards",
      "Increasing internet speed",
      "Replacing identity systems",
      "Writing HTML"
    ],
    "answer": 0,
    "explanation": "Azure governance uses tools such as Policy, RBAC, locks and management groups to control environments.",
    "simpleExplanation": "Governance keeps Azure use under control.",
    "memoryTip": "Governance = control and standards.",
    "difficulty": "Intermediate",
    "concept": "Governance"
  },
  {
    "id": "ag-16",
    "topicId": "azure-governance",
    "question": "Which practice helps organize cloud costs by department?",
    "options": [
      "Using consistent tags",
      "Disabling monitoring",
      "Deleting subscriptions",
      "Using random resource names"
    ],
    "answer": 0,
    "explanation": "Consistent tags can identify owners, departments, projects or environments for cost analysis.",
    "simpleExplanation": "Tags can show who or what a resource belongs to.",
    "memoryTip": "Tags = cost labels.",
    "difficulty": "Beginner",
    "concept": "Cost management"
  },
  {
    "id": "ag-17",
    "topicId": "azure-governance",
    "question": "What is least privilege?",
    "options": [
      "Giving users only the permissions they need",
      "Giving everyone owner access",
      "Removing all permissions",
      "Giving anonymous access"
    ],
    "answer": 0,
    "explanation": "Least privilege minimizes access to what is necessary for a task.",
    "simpleExplanation": "Give only the access needed.",
    "memoryTip": "Least privilege = minimum necessary access.",
    "difficulty": "Beginner",
    "concept": "Security"
  },
  {
    "id": "ag-18",
    "topicId": "azure-governance",
    "question": "What is a service lifecycle?",
    "options": [
      "The stages through which a service or feature progresses, including changes and retirement",
      "A network cable",
      "A password policy",
      "A storage file"
    ],
    "answer": 0,
    "explanation": "Service lifecycles describe how services/features are introduced, changed and eventually retired.",
    "simpleExplanation": "Services can move through stages from introduction to retirement.",
    "memoryTip": "Lifecycle = stages over time.",
    "difficulty": "Intermediate",
    "concept": "Service lifecycle"
  },
  {
    "id": "ag-19",
    "topicId": "azure-governance",
    "question": "Why should organizations monitor cloud resources?",
    "options": [
      "To detect performance, availability and operational issues",
      "To prevent all changes",
      "To eliminate backups",
      "To avoid using metrics"
    ],
    "answer": 0,
    "explanation": "Monitoring provides telemetry that helps identify and investigate issues.",
    "simpleExplanation": "You monitor systems so you can see what is happening.",
    "memoryTip": "Monitor = visibility.",
    "difficulty": "Beginner",
    "concept": "Monitoring"
  },
  {
    "id": "ag-20",
    "topicId": "azure-governance",
    "question": "Which control is best for preventing deletion of a critical resource?",
    "options": [
      "A delete lock",
      "A DNS record",
      "A storage blob",
      "A cost report"
    ],
    "answer": 0,
    "explanation": "A delete lock helps prevent accidental deletion of a resource.",
    "simpleExplanation": "A delete lock protects against deletion.",
    "memoryTip": "Lock = stop deletion.",
    "difficulty": "Beginner",
    "concept": "Resource locks"
  }
]

const additionalAdvancedQuestions: Question[] = [
  // =========================================================
  // CLOUD CONCEPTS — ADVANCED
  // =========================================================

  {
    id: 'cc-adv-1',
    topicId: 'cloud-concepts',
    question: 'A company wants to reduce downtime if one cloud component fails. Which concept should guide this design?',
    options: [
      'High availability',
      'Vertical scaling',
      'Capital expenditure',
      'Manual deployment'
    ],
    answer: 0,
    explanation: 'High availability uses redundancy and resilient designs to keep services running when components fail.',
    simpleExplanation: 'High availability means designing so one failure does not stop everything.',
    memoryTip: 'High availability = keep the service available.',
    difficulty: 'Advanced',
    concept: 'High availability'
  },

  {
    id: 'cc-adv-2',
    topicId: 'cloud-concepts',
    question: 'An application automatically adds compute resources when demand increases. Which cloud benefit is demonstrated?',
    options: [
      'Elasticity',
      'Governance',
      'Data residency',
      'Fault isolation'
    ],
    answer: 0,
    explanation: 'Elasticity allows resources to increase or decrease automatically according to demand.',
    simpleExplanation: 'Elasticity means the cloud can stretch or shrink resources as needed.',
    memoryTip: 'Elastic = grows and shrinks with demand.',
    difficulty: 'Advanced',
    concept: 'Elasticity'
  },

  {
    id: 'cc-adv-3',
    topicId: 'cloud-concepts',
    question: 'A company keeps sensitive infrastructure in its own datacenter but uses Azure for additional capacity. Which cloud model best describes this?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Community cloud'
    ],
    answer: 2,
    explanation: 'A hybrid cloud combines private infrastructure with public cloud services.',
    simpleExplanation: 'Hybrid means using your own environment together with the public cloud.',
    memoryTip: 'Hybrid = private + public.',
    difficulty: 'Advanced',
    concept: 'Hybrid cloud'
  },

  {
    id: 'cc-adv-4',
    topicId: 'cloud-concepts',
    question: 'Which situation best demonstrates the consumption-based cloud pricing model?',
    options: [
      'Buying servers for five years upfront',
      'Paying for resources according to actual usage',
      'Buying a fixed number of physical servers',
      'Paying the same amount regardless of usage'
    ],
    answer: 1,
    explanation: 'Consumption-based pricing charges customers based on the resources they actually consume.',
    simpleExplanation: 'You pay for what you use instead of buying everything upfront.',
    memoryTip: 'Consumption = pay for what you consume.',
    difficulty: 'Advanced',
    concept: 'Consumption-based model'
  },

  {
    id: 'cc-adv-5',
    topicId: 'cloud-concepts',
    question: 'A workload must continue operating even when a single server fails. What design principle is most important?',
    options: [
      'Redundancy',
      'Manual scaling',
      'Single tenancy',
      'Local storage only'
    ],
    answer: 0,
    explanation: 'Redundancy provides multiple resources so the workload can continue if one resource fails.',
    simpleExplanation: 'Have a backup resource ready to take over when one fails.',
    memoryTip: 'Redundancy = more than one resource.',
    difficulty: 'Advanced',
    concept: 'Redundancy'
  },

  {
    id: 'cc-adv-6',
    topicId: 'cloud-concepts',
    question: 'A business wants to move quickly without purchasing physical servers. Which cloud benefit is most relevant?',
    options: [
      'Agility',
      'Data sovereignty',
      'Physical isolation',
      'Hardware ownership'
    ],
    answer: 0,
    explanation: 'Cloud agility allows organizations to provision resources quickly and respond rapidly to changing requirements.',
    simpleExplanation: 'Agility means you can create and change resources quickly.',
    memoryTip: 'Agility = move quickly.',
    difficulty: 'Advanced',
    concept: 'Cloud agility'
  },

  {
    id: 'cc-adv-7',
    topicId: 'cloud-concepts',
    question: 'Which statement best distinguishes scalability from elasticity?',
    options: [
      'Scalability handles growth, while elasticity can automatically adjust to changing demand',
      'They always mean exactly the same thing',
      'Scalability only applies to storage',
      'Elasticity only applies to physical servers'
    ],
    answer: 0,
    explanation: 'Scalability is the ability to handle increased workload, while elasticity emphasizes dynamic adjustment as demand changes.',
    simpleExplanation: 'Scalability handles growth; elasticity adjusts resources as demand changes.',
    memoryTip: 'Scale = handle more. Elastic = adjust automatically.',
    difficulty: 'Advanced',
    concept: 'Scalability and elasticity'
  },

  {
    id: 'cc-adv-8',
    topicId: 'cloud-concepts',
    question: 'Under the shared responsibility model, which responsibility generally remains with the customer?',
    options: [
      'Physical security of Azure datacenters',
      'Security of customer data and identities',
      'Maintenance of Azure physical servers',
      'Power management of Azure datacenters'
    ],
    answer: 1,
    explanation: 'Customers remain responsible for aspects such as their data, identities, accounts and access configuration.',
    simpleExplanation: 'Azure secures the cloud infrastructure; customers still secure what they put in the cloud.',
    memoryTip: 'Think: security OF the cloud vs security IN the cloud.',
    difficulty: 'Advanced',
    concept: 'Shared responsibility'
  },

  {
    id: 'cc-adv-9',
    topicId: 'cloud-concepts',
    question: 'A company wants to avoid paying for unused infrastructure during periods of low demand. Which cloud capability helps most?',
    options: [
      'Elastic scaling',
      'Physical server ownership',
      'Fixed capacity',
      'Manual procurement'
    ],
    answer: 0,
    explanation: 'Elastic scaling allows resources to decrease when demand falls, reducing unnecessary resource consumption.',
    simpleExplanation: 'Scale down when fewer resources are needed.',
    memoryTip: 'High demand: scale up. Low demand: scale down.',
    difficulty: 'Advanced',
    concept: 'Elastic scaling'
  },

  {
    id: 'cc-adv-10',
    topicId: 'cloud-concepts',
    question: 'Which cloud model gives an organization the greatest control over its physical infrastructure?',
    options: [
      'Public cloud',
      'Private cloud',
      'SaaS',
      'Serverless'
    ],
    answer: 1,
    explanation: 'A private cloud provides greater organizational control over infrastructure and its environment.',
    simpleExplanation: 'Private cloud gives the organization more control over its environment.',
    memoryTip: 'Private = more direct control.',
    difficulty: 'Advanced',
    concept: 'Private cloud'
  },

  // =========================================================
  // AZURE ARCHITECTURE & SERVICES — ADVANCED
  // =========================================================

  {
    id: 'as-adv-1',
    topicId: 'azure-architecture',
    question: 'An application must remain available if an Azure datacenter within a region becomes unavailable. What should the design use?',
    options: [
      'Availability zones',
      'One virtual machine',
      'One storage disk',
      'A single region only'
    ],
    answer: 0,
    explanation: 'Availability zones are physically separate locations within an Azure region designed for high availability.',
    simpleExplanation: 'Put important workloads across separate zones so one datacenter failure does not stop them.',
    memoryTip: 'Zones = separate locations inside a region.',
    difficulty: 'Advanced',
    concept: 'Availability zones'
  },

  {
    id: 'as-adv-2',
    topicId: 'azure-architecture',
    question: 'A company needs protection against an entire Azure region becoming unavailable. Which approach is most appropriate?',
    options: [
      'Use multiple Azure regions',
      'Use one availability zone',
      'Use one virtual machine',
      'Use only a resource group'
    ],
    answer: 0,
    explanation: 'Using multiple regions can provide resilience against a regional outage.',
    simpleExplanation: 'If one region fails, another region can continue serving users.',
    memoryTip: 'Zone protects within a region; region protects against regional failure.',
    difficulty: 'Advanced',
    concept: 'Azure regions'
  },

  {
    id: 'as-adv-3',
    topicId: 'azure-architecture',
    question: 'Which Azure service is most appropriate for running virtual machines when an organization needs control over the operating system?',
    options: [
      'Azure Virtual Machines',
      'Azure Functions',
      'Azure Blob Storage',
      'Azure DNS'
    ],
    answer: 0,
    explanation: 'Azure Virtual Machines provide virtualized compute while allowing significant control over the operating system and software.',
    simpleExplanation: 'VMs are useful when you need control over the operating system.',
    memoryTip: 'VM = virtual computer with OS control.',
    difficulty: 'Advanced',
    concept: 'Azure Virtual Machines'
  },

  {
    id: 'as-adv-4',
    topicId: 'azure-architecture',
    question: 'A developer wants to run small pieces of code in response to events without managing servers. Which service fits best?',
    options: [
      'Azure Functions',
      'Azure Virtual Machines',
      'Azure Virtual Network',
      'Azure Files'
    ],
    answer: 0,
    explanation: 'Azure Functions is a serverless compute service designed for event-driven workloads.',
    simpleExplanation: 'Functions lets you run code without managing the server yourself.',
    memoryTip: 'Functions = event-driven serverless code.',
    difficulty: 'Advanced',
    concept: 'Azure Functions'
  },

  {
    id: 'as-adv-5',
    topicId: 'azure-architecture',
    question: 'A company needs object storage for images and videos. Which Azure service is most appropriate?',
    options: [
      'Azure Blob Storage',
      'Azure Virtual Machines',
      'Azure DNS',
      'Azure VPN Gateway'
    ],
    answer: 0,
    explanation: 'Azure Blob Storage is designed for storing large amounts of unstructured data such as images, videos and documents.',
    simpleExplanation: 'Blob Storage is like a huge cloud storage area for files and other objects.',
    memoryTip: 'Blob = big unstructured objects.',
    difficulty: 'Advanced',
    concept: 'Azure Blob Storage'
  },

  {
    id: 'as-adv-6',
    topicId: 'azure-architecture',
    question: 'Which Azure networking service provides private network connectivity for Azure resources?',
    options: [
      'Azure Virtual Network',
      'Azure Blob Storage',
      'Azure Functions',
      'Azure Monitor'
    ],
    answer: 0,
    explanation: 'Azure Virtual Network provides networking capabilities that allow Azure resources to communicate securely.',
    simpleExplanation: 'A virtual network is like a private network in Azure.',
    memoryTip: 'VNet = Azure private network.',
    difficulty: 'Advanced',
    concept: 'Azure Virtual Network'
  },

  {
    id: 'as-adv-7',
    topicId: 'azure-architecture',
    question: 'A web application needs traffic distributed across multiple backend servers. Which service is designed for this purpose?',
    options: [
      'Azure Load Balancer',
      'Azure Blob Storage',
      'Azure Key Vault',
      'Azure DNS'
    ],
    answer: 0,
    explanation: 'Azure Load Balancer distributes incoming network traffic across backend resources.',
    simpleExplanation: 'The load balancer shares incoming work between servers.',
    memoryTip: 'Load balancer = share the traffic.',
    difficulty: 'Advanced',
    concept: 'Load balancing'
  },

  {
    id: 'as-adv-8',
    topicId: 'azure-architecture',
    question: 'Which Azure service is designed to store secrets, keys and certificates securely?',
    options: [
      'Azure Key Vault',
      'Azure Storage Account',
      'Azure Load Balancer',
      'Azure Virtual Network'
    ],
    answer: 0,
    explanation: 'Azure Key Vault securely stores and manages secrets, cryptographic keys and certificates.',
    simpleExplanation: 'Key Vault is a secure place for important secrets and keys.',
    memoryTip: 'Key Vault = protect keys and secrets.',
    difficulty: 'Advanced',
    concept: 'Azure Key Vault'
  },

  {
    id: 'as-adv-9',
    topicId: 'azure-architecture',
    question: 'A company wants users to access Azure services using a central identity system. Which service provides the identity platform?',
    options: [
      'Microsoft Entra ID',
      'Azure Blob Storage',
      'Azure Load Balancer',
      'Azure Virtual Network'
    ],
    answer: 0,
    explanation: 'Microsoft Entra ID provides identity and access management capabilities for users and applications.',
    simpleExplanation: 'Entra ID manages identities and access to resources.',
    memoryTip: 'Entra ID = identity and access.',
    difficulty: 'Advanced',
    concept: 'Microsoft Entra ID'
  },

  {
    id: 'as-adv-10',
    topicId: 'azure-architecture',
    question: 'Which design best improves application resilience against failure of a single compute instance?',
    options: [
      'Run multiple instances',
      'Use only one large instance',
      'Disable monitoring',
      'Store everything locally'
    ],
    answer: 0,
    explanation: 'Multiple instances provide redundancy and reduce dependence on a single compute resource.',
    simpleExplanation: 'Several instances mean one failure does not necessarily stop the application.',
    memoryTip: 'Multiple instances = less dependence on one server.',
    difficulty: 'Advanced',
    concept: 'Compute resilience'
  },

  // =========================================================
  // AZURE MANAGEMENT & GOVERNANCE — ADVANCED
  // =========================================================

  {
    id: 'ag-adv-1',
    topicId: 'azure-governance',
    question: 'An organization wants to prevent users from creating resources outside approved Azure regions. Which service should it use?',
    options: [
      'Azure Policy',
      'Azure Monitor',
      'Azure Advisor',
      'Azure Storage'
    ],
    answer: 0,
    explanation: 'Azure Policy can enforce organizational rules such as allowed locations for resources.',
    simpleExplanation: 'Azure Policy makes sure resources follow organizational rules.',
    memoryTip: 'Policy = rules.',
    difficulty: 'Advanced',
    concept: 'Azure Policy'
  },

  {
    id: 'ag-adv-2',
    topicId: 'azure-governance',
    question: 'A company wants to give an employee permission to manage virtual machines but not modify billing settings. Which capability should be used?',
    options: [
      'Azure RBAC',
      'Azure Policy',
      'Azure Monitor',
      'Azure Advisor'
    ],
    answer: 0,
    explanation: 'Azure role-based access control allows permissions to be assigned according to roles and scopes.',
    simpleExplanation: 'RBAC controls who can perform which actions on Azure resources.',
    memoryTip: 'RBAC = who can do what.',
    difficulty: 'Advanced',
    concept: 'Azure RBAC'
  },

  {
    id: 'ag-adv-3',
    topicId: 'azure-governance',
    question: 'Which Azure service helps identify opportunities to improve cost, performance, reliability and security?',
    options: [
      'Azure Advisor',
      'Azure DNS',
      'Azure Blob Storage',
      'Azure Virtual Network'
    ],
    answer: 0,
    explanation: 'Azure Advisor provides recommendations related to cost, performance, reliability and security.',
    simpleExplanation: 'Advisor gives recommendations for improving your Azure environment.',
    memoryTip: 'Advisor = recommendations.',
    difficulty: 'Advanced',
    concept: 'Azure Advisor'
  },

  {
    id: 'ag-adv-4',
    topicId: 'azure-governance',
    question: 'A team needs to determine how much an Azure workload is costing over time. Which tool is most appropriate?',
    options: [
      'Microsoft Cost Management',
      'Azure DNS',
      'Azure Functions',
      'Azure Load Balancer'
    ],
    answer: 0,
    explanation: 'Microsoft Cost Management provides tools for analyzing and managing Azure spending.',
    simpleExplanation: 'Cost Management helps you understand and control cloud spending.',
    memoryTip: 'Cost Management = track and control spending.',
    difficulty: 'Advanced',
    concept: 'Cost Management'
  },

  {
    id: 'ag-adv-5',
    topicId: 'azure-governance',
    question: 'An organization wants resources from different departments grouped and managed under a common hierarchy. Which Azure concept is useful?',
    options: [
      'Management groups',
      'Availability zones',
      'Storage containers',
      'Virtual machines'
    ],
    answer: 0,
    explanation: 'Management groups organize subscriptions into a hierarchy so governance can be applied across multiple subscriptions.',
    simpleExplanation: 'Management groups help organize many Azure subscriptions.',
    memoryTip: 'Management group = manage subscriptions together.',
    difficulty: 'Advanced',
    concept: 'Management groups'
  },

  {
    id: 'ag-adv-6',
    topicId: 'azure-governance',
    question: 'Which Azure service provides centralized monitoring data such as metrics and logs from resources?',
    options: [
      'Azure Monitor',
      'Azure Policy',
      'Azure Advisor',
      'Microsoft Cost Management'
    ],
    answer: 0,
    explanation: 'Azure Monitor collects and analyzes monitoring data from Azure resources and applications.',
    simpleExplanation: 'Azure Monitor watches what is happening in your Azure environment.',
    memoryTip: 'Monitor = observe.',
    difficulty: 'Advanced',
    concept: 'Azure Monitor'
  },

  {
    id: 'ag-adv-7',
    topicId: 'azure-governance',
    question: 'A company wants to automatically detect resources that violate an organizational configuration rule. Which service should be considered?',
    options: [
      'Azure Policy',
      'Azure Blob Storage',
      'Azure Functions',
      'Azure DNS'
    ],
    answer: 0,
    explanation: 'Azure Policy evaluates resources against organizational standards and can identify or prevent non-compliant configurations.',
    simpleExplanation: 'Policy checks whether resources follow the rules.',
    memoryTip: 'Policy checks compliance.',
    difficulty: 'Advanced',
    concept: 'Policy compliance'
  },

  {
    id: 'ag-adv-8',
    topicId: 'azure-governance',
    question: 'Which capability helps ensure that users receive only the permissions needed for their responsibilities?',
    options: [
      'Role-based access control',
      'Unlimited administrator access',
      'Public network access',
      'Resource duplication'
    ],
    answer: 0,
    explanation: 'RBAC supports assigning appropriate roles and permissions at suitable scopes.',
    simpleExplanation: 'Give people the permissions they actually need, not everything.',
    memoryTip: 'RBAC supports least-privilege access.',
    difficulty: 'Advanced',
    concept: 'Least privilege'
  },

  {
    id: 'ag-adv-9',
    topicId: 'azure-governance',
    question: 'A company wants to organize resources so they can be managed together and deleted together. What should it use?',
    options: [
      'Resource groups',
      'Availability zones',
      'Azure regions',
      'Management groups'
    ],
    answer: 0,
    explanation: 'Resource groups are logical containers for related Azure resources and help organize their lifecycle.',
    simpleExplanation: 'A resource group is like a folder for related Azure resources.',
    memoryTip: 'Resource group = group related resources.',
    difficulty: 'Advanced',
    concept: 'Resource groups'
  },

  {
    id: 'ag-adv-10',
    topicId: 'azure-governance',
    question: 'Which Azure governance approach is most appropriate for enforcing consistent organizational standards across resources?',
    options: [
      'Azure Policy',
      'Azure Load Balancer',
      'Azure Blob Storage',
      'Azure Functions'
    ],
    answer: 0,
    explanation: 'Azure Policy can enforce and audit organizational standards across Azure resources.',
    simpleExplanation: 'Use Policy when you need Azure resources to follow defined rules.',
    memoryTip: 'Governance rules = Policy.',
    difficulty: 'Advanced',
    concept: 'Governance'
  }
]

// Add the additional Advanced questions to the existing question bank.
questions.push(...additionalAdvancedQuestions)