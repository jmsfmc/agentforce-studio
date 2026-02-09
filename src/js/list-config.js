/**
 * List page configuration: title, columns, and 10 rows per entity type.
 * Consumed by list-render.js to inject content into the list shell.
 */
(function (global) {
  'use strict';

  var AVATAR_URL = 'theme/slds-1/assets/images/avatar2.jpg';
  var CREATED_BY = 'Geeta Joshi';
  var DATES = ['6/17/2026, 11:30 AM', '6/18/2026, 11:45 AM', '6/24/2026, 2:15 PM', '6/25/2026, 2:30 PM'];

  function avatarCell(name) {
    return { type: 'avatar', value: name };
  }

  function row(name, rest) {
    var r = { name: name };
    for (var k in rest) r[k] = rest[k];
    return r;
  }

  /**
   * Convert a display name to a URL-safe slug (lowercase, spaces/special chars to single hyphen).
   * Used for path-based detail URLs and for resolving slug back to row in config.rows.
   */
  function nameToSlug(name) {
    if (name == null) return '';
    var s = String(name).trim().toLowerCase();
    return s.replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  var LIST_CONFIG = {
    agents: {
      title: 'My Agents',
      newButtonLabel: 'New Agent',
      detailPageUrl: 'agent-detail.html',
      listPageUrl: 'agents.html',
      pathPrefix: 'my-agents',
      icon: 'bot',
      sectionIcon: 'sparkle',
      columns: [
        { key: 'name', label: 'Agent Name' },
        { key: 'createdBy', label: 'Created By', avatar: true },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'lastModifiedBy', label: 'Last Modified By', avatar: true },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Service Agent', { createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Automation Agent', { createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Customer Success Agent', { createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Data Analysis Agent', { createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Training Agent', { createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Security Agent', { createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Compliance Agent', { createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Integration Agent', { createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Feedback Agent', { createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Billing Agent', { createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedBy: CREATED_BY, lastModifiedDate: DATES[3] })
      ]
    },
    'asset-library': {
      title: 'Asset Library',
      newButtonLabel: 'New Asset',
      detailPageUrl: 'asset-library-detail.html',
      listPageUrl: 'asset-library.html',
      pathPrefix: 'asset-library',
      icon: 'knowledge_base',
      sectionIcon: 'sparkle',
      columns: [
        { key: 'name', label: 'Asset Name' },
        { key: 'type', label: 'Type' },
        { key: 'createdBy', label: 'Created By', avatar: true },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Customer Onboarding Flow', { type: 'Flow', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Case Routing Prompt', { type: 'Prompt Template', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('FAQ Skill Pack', { type: 'Skill', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Lead Scoring Flow', { type: 'Flow', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('Welcome Message Template', { type: 'Prompt Template', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Document Extraction Skill', { type: 'Skill', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('Approval Workflow', { type: 'Flow', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Sentiment Analysis Prompt', { type: 'Prompt Template', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('Data Enrichment Skill', { type: 'Skill', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Escalation Flow', { type: 'Flow', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] })
      ]
    },
    connections: {
      title: 'Connections',
      newButtonLabel: 'New Connection',
      detailPageUrl: 'connection-detail.html',
      listPageUrl: 'connections.html',
      pathPrefix: 'connections',
      icon: 'connection',
      sectionIcon: 'sparkle',
      columns: [
        { key: 'name', label: 'Connection Name' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status' },
        { key: 'createdBy', label: 'Created By', avatar: true },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Salesforce API', { type: 'API', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Service Cloud DB', { type: 'Database', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Slack Events', { type: 'Event', status: 'Inactive', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Einstein API', { type: 'API', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[2] }),
        row('Data Warehouse', { type: 'Database', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[0] }),
        row('Email Inbound', { type: 'Event', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('CRM Sync', { type: 'API', status: 'Error', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Analytics DB', { type: 'Database', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[2] }),
        row('Webhook Inbound', { type: 'Event', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[0] }),
        row('External Knowledge API', { type: 'API', status: 'Active', createdBy: CREATED_BY, lastModifiedDate: DATES[3] })
      ]
    },
    'mcp-servers': {
      title: 'MCP Servers',
      newButtonLabel: 'New MCP Server',
      detailPageUrl: 'mcp-server-detail.html',
      listPageUrl: 'mcp-servers.html',
      pathPrefix: 'mcp-servers',
      icon: 'server',
      sectionIcon: 'sparkle',
      columns: [
        { key: 'name', label: 'Server Name' },
        { key: 'endpoint', label: 'Endpoint' },
        { key: 'status', label: 'Status' },
        { key: 'createdBy', label: 'Created By', avatar: true },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Code Execution Server', { endpoint: 'https://mcp.internal/code', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Filesystem MCP', { endpoint: 'https://mcp.internal/fs', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Database MCP', { endpoint: 'localhost:8080', status: 'Disconnected', createdBy: CREATED_BY, lastModifiedDate: DATES[0] }),
        row('Git MCP', { endpoint: 'https://mcp.internal/git', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[2] }),
        row('Slack MCP', { endpoint: 'https://mcp.internal/slack', status: 'Pending', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Jira MCP', { endpoint: 'https://mcp.internal/jira', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Salesforce MCP', { endpoint: 'https://mcp.internal/sf', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[0] }),
        row('Search MCP', { endpoint: 'https://mcp.internal/search', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[2] }),
        row('Memory MCP', { endpoint: 'localhost:9090', status: 'Disconnected', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Web MCP', { endpoint: 'https://mcp.internal/web', status: 'Connected', createdBy: CREATED_BY, lastModifiedDate: DATES[3] })
      ]
    },
    'foundation-models': {
      title: 'Foundation Models',
      newButtonLabel: 'New Model',
      detailPageUrl: 'foundation-model-detail.html',
      listPageUrl: 'foundation-models.html',
      pathPrefix: 'foundation-models',
      icon: 'bot',
      sectionIcon: 'fallback',
      columns: [
        { key: 'name', label: 'Model Name' },
        { key: 'provider', label: 'Provider' },
        { key: 'version', label: 'Version' },
        { key: 'status', label: 'Status' },
        { key: 'createdDate', label: 'Created Date' }
      ],
      rows: [
        row('Einstein GPT', { provider: 'Salesforce', version: '1.2', status: 'Active', createdDate: DATES[0] }),
        row('Claude Foundation', { provider: 'Anthropic', version: '3.0', status: 'Active', createdDate: DATES[2] }),
        row('GPT-4 Base', { provider: 'OpenAI', version: '4.0', status: 'Active', createdDate: DATES[1] }),
        row('Llama 3', { provider: 'Meta', version: '3.2', status: 'Active', createdDate: DATES[3] }),
        row('Einstein Trust Layer', { provider: 'Salesforce', version: '2.0', status: 'Active', createdDate: DATES[0] }),
        row('Mistral Large', { provider: 'Mistral', version: '1.0', status: 'Deprecated', createdDate: DATES[2] }),
        row('Jurassic-2', { provider: 'AI21', version: '2.0', status: 'Active', createdDate: DATES[1] }),
        row('Command R+', { provider: 'Cohere', version: '1.1', status: 'Active', createdDate: DATES[3] }),
        row('Gemini Pro', { provider: 'Google', version: '1.0', status: 'Active', createdDate: DATES[0] }),
        row('Einstein Summarization', { provider: 'Salesforce', version: '1.0', status: 'Active', createdDate: DATES[2] })
      ]
    },
    'generative-models': {
      title: 'Generative Models',
      newButtonLabel: 'New Model',
      detailPageUrl: 'generative-model-detail.html',
      listPageUrl: 'generative-models.html',
      pathPrefix: 'generative-models',
      icon: 'bot',
      sectionIcon: 'fallback',
      columns: [
        { key: 'name', label: 'Model Name' },
        { key: 'provider', label: 'Provider' },
        { key: 'capabilities', label: 'Capabilities' },
        { key: 'status', label: 'Status' },
        { key: 'lastUpdated', label: 'Last Updated' }
      ],
      rows: [
        row('Claude 3', { provider: 'Anthropic', capabilities: 'Text, Vision', status: 'Active', lastUpdated: DATES[3] }),
        row('GPT-4o', { provider: 'OpenAI', capabilities: 'Text, Vision, Audio', status: 'Active', lastUpdated: DATES[1] }),
        row('Einstein Conversation', { provider: 'Salesforce', capabilities: 'Text', status: 'Active', lastUpdated: DATES[0] }),
        row('Llama 3.1', { provider: 'Meta', capabilities: 'Text', status: 'Active', lastUpdated: DATES[2] }),
        row('Gemini Flash', { provider: 'Google', capabilities: 'Text, Vision', status: 'Active', lastUpdated: DATES[3] }),
        row('Mistral Medium', { provider: 'Mistral', capabilities: 'Text', status: 'Active', lastUpdated: DATES[1] }),
        row('Claude 3 Haiku', { provider: 'Anthropic', capabilities: 'Text', status: 'Active', lastUpdated: DATES[0] }),
        row('GPT-3.5 Turbo', { provider: 'OpenAI', capabilities: 'Text', status: 'Deprecated', lastUpdated: DATES[2] }),
        row('Cohere Command', { provider: 'Cohere', capabilities: 'Text', status: 'Active', lastUpdated: DATES[3] }),
        row('Einstein CodeGen', { provider: 'Salesforce', capabilities: 'Text', status: 'Active', lastUpdated: DATES[1] })
      ]
    },
    'predictive-models': {
      title: 'Predictive Models',
      newButtonLabel: 'New Model',
      detailPageUrl: 'predictive-model-detail.html',
      listPageUrl: 'predictive-models.html',
      pathPrefix: 'predictive-models',
      icon: 'forecasts',
      sectionIcon: 'fallback',
      columns: [
        { key: 'name', label: 'Model Name' },
        { key: 'type', label: 'Type' },
        { key: 'version', label: 'Version' },
        { key: 'status', label: 'Status' },
        { key: 'lastTrained', label: 'Last Trained' }
      ],
      rows: [
        row('Churn Predictor', { type: 'Classification', version: '2.1', status: 'Active', lastTrained: DATES[2] }),
        row('Lead Score', { type: 'Regression', version: '1.5', status: 'Active', lastTrained: DATES[0] }),
        row('Next Best Action', { type: 'Recommendation', version: '3.0', status: 'Active', lastTrained: DATES[3] }),
        row('Demand Forecast', { type: 'Time Series', version: '1.0', status: 'Active', lastTrained: DATES[1] }),
        row('Sentiment Model', { type: 'Classification', version: '1.2', status: 'Active', lastTrained: DATES[2] }),
        row('LTV Predictor', { type: 'Regression', version: '2.0', status: 'Active', lastTrained: DATES[0] }),
        row('Case Routing', { type: 'Classification', version: '1.8', status: 'Deprecated', lastTrained: DATES[3] }),
        row('Inventory Forecast', { type: 'Time Series', version: '1.1', status: 'Active', lastTrained: DATES[1] }),
        row('Product Affinity', { type: 'Recommendation', version: '2.2', status: 'Active', lastTrained: DATES[2] }),
        row('Risk Score', { type: 'Regression', version: '1.0', status: 'Active', lastTrained: DATES[0] })
      ]
    },
    'embedding-models': {
      title: 'Embedding Models',
      newButtonLabel: 'New Model',
      detailPageUrl: 'embedding-model-detail.html',
      listPageUrl: 'embedding-models.html',
      pathPrefix: 'embedding-models',
      icon: 'bot',
      sectionIcon: 'fallback',
      columns: [
        { key: 'name', label: 'Model Name' },
        { key: 'dimensions', label: 'Dimensions' },
        { key: 'provider', label: 'Provider' },
        { key: 'status', label: 'Status' },
        { key: 'createdDate', label: 'Created Date' }
      ],
      rows: [
        row('Einstein Embeddings', { dimensions: '1024', provider: 'Salesforce', status: 'Active', createdDate: DATES[0] }),
        row('text-embedding-3-small', { dimensions: '1536', provider: 'OpenAI', status: 'Active', createdDate: DATES[2] }),
        row('embed-multilingual-v3', { dimensions: '1024', provider: 'Cohere', status: 'Active', createdDate: DATES[1] }),
        row('Einstein Semantic', { dimensions: '768', provider: 'Salesforce', status: 'Active', createdDate: DATES[3] }),
        row('text-embedding-ada-002', { dimensions: '1536', provider: 'OpenAI', status: 'Deprecated', createdDate: DATES[0] }),
        row('E5 Large', { dimensions: '1024', provider: 'Microsoft', status: 'Active', createdDate: DATES[2] }),
        row('Nomic Embed', { dimensions: '768', provider: 'Nomic', status: 'Active', createdDate: DATES[1] }),
        row('Voyage-2', { dimensions: '1024', provider: 'Voyage', status: 'Active', createdDate: DATES[3] }),
        row('BGE Large', { dimensions: '1024', provider: 'BAAI', status: 'Active', createdDate: DATES[0] }),
        row('Instructor XL', { dimensions: '768', provider: 'HKUNLP', status: 'Active', createdDate: DATES[2] })
      ]
    },
    'data-libraries': {
      title: 'Data Libraries',
      newButtonLabel: 'New Library',
      detailPageUrl: 'data-library-detail.html',
      listPageUrl: 'data-libraries.html',
      pathPrefix: 'data-libraries',
      icon: 'knowledge_base',
      sectionIcon: 'database',
      columns: [
        { key: 'name', label: 'Library Name' },
        { key: 'type', label: 'Type' },
        { key: 'recordCount', label: 'Record Count' },
        { key: 'createdBy', label: 'Created By', avatar: true },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Knowledge Base', { type: 'Standard', recordCount: '12,450', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Product Docs', { type: 'Custom', recordCount: '3,200', createdBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Support Articles', { type: 'Standard', recordCount: '8,100', createdBy: CREATED_BY, lastModifiedDate: DATES[0] }),
        row('Internal Wiki', { type: 'Custom', recordCount: '1,850', createdBy: CREATED_BY, lastModifiedDate: DATES[2] }),
        row('Case History', { type: 'Standard', recordCount: '45,000', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Policy Library', { type: 'Custom', recordCount: '520', createdBy: CREATED_BY, lastModifiedDate: DATES[3] }),
        row('Training Materials', { type: 'Custom', recordCount: '2,100', createdBy: CREATED_BY, lastModifiedDate: DATES[0] }),
        row('API Documentation', { type: 'Standard', recordCount: '980', createdBy: CREATED_BY, lastModifiedDate: DATES[2] }),
        row('Compliance Docs', { type: 'Custom', recordCount: '340', createdBy: CREATED_BY, lastModifiedDate: DATES[1] }),
        row('Sales Playbooks', { type: 'Custom', recordCount: '1,200', createdBy: CREATED_BY, lastModifiedDate: DATES[3] })
      ]
    },
    'search-indexes': {
      title: 'Search Indexes',
      newButtonLabel: 'New Index',
      detailPageUrl: 'search-index-detail.html',
      listPageUrl: 'search-indexes.html',
      pathPrefix: 'search-indexes',
      icon: 'knowledge_base',
      sectionIcon: 'database',
      columns: [
        { key: 'name', label: 'Index Name' },
        { key: 'source', label: 'Source' },
        { key: 'status', label: 'Status' },
        { key: 'lastBuilt', label: 'Last Built' },
        { key: 'recordCount', label: 'Record Count' }
      ],
      rows: [
        row('Case Search Index', { source: 'Cases', status: 'Ready', lastBuilt: DATES[2], recordCount: '45,000' }),
        row('Knowledge Index', { source: 'Knowledge', status: 'Ready', lastBuilt: DATES[0], recordCount: '12,450' }),
        row('Account Search', { source: 'Accounts', status: 'Building', lastBuilt: DATES[3], recordCount: '28,100' }),
        row('Product Catalog Index', { source: 'Products', status: 'Ready', lastBuilt: DATES[1], recordCount: '5,200' }),
        row('Email Search', { source: 'Emails', status: 'Ready', lastBuilt: DATES[2], recordCount: '102,000' }),
        row('Document Index', { source: 'Files', status: 'Ready', lastBuilt: DATES[0], recordCount: '8,400' }),
        row('Conversation Index', { source: 'Chat', status: 'Failed', lastBuilt: DATES[3], recordCount: '0' }),
        row('Lead Index', { source: 'Leads', status: 'Ready', lastBuilt: DATES[1], recordCount: '15,600' }),
        row('Article Index', { source: 'Knowledge', status: 'Ready', lastBuilt: DATES[2], recordCount: '3,800' }),
        row('Unified Search', { source: 'Multiple', status: 'Ready', lastBuilt: DATES[0], recordCount: '89,000' })
      ]
    },
    retrievers: {
      title: 'Retrievers',
      newButtonLabel: 'New Retriever',
      detailPageUrl: 'retriever-detail.html',
      listPageUrl: 'retrievers.html',
      pathPrefix: 'retrievers',
      icon: 'knowledge_base',
      sectionIcon: 'database',
      columns: [
        { key: 'name', label: 'Retriever Name' },
        { key: 'type', label: 'Type' },
        { key: 'dataSource', label: 'Data Source' },
        { key: 'status', label: 'Status' },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Semantic Retriever', { type: 'Semantic', dataSource: 'Knowledge Base', status: 'Active', lastModifiedDate: DATES[1] }),
        row('Case Keyword Retriever', { type: 'Keyword', dataSource: 'Case Search Index', status: 'Active', lastModifiedDate: DATES[3] }),
        row('Hybrid Support Retriever', { type: 'Semantic', dataSource: 'Support Articles', status: 'Active', lastModifiedDate: DATES[0] }),
        row('Product Retriever', { type: 'Keyword', dataSource: 'Product Catalog Index', status: 'Active', lastModifiedDate: DATES[2] }),
        row('Policy Retriever', { type: 'Semantic', dataSource: 'Policy Library', status: 'Active', lastModifiedDate: DATES[1] }),
        row('Unified Retriever', { type: 'Semantic', dataSource: 'Unified Search', status: 'Active', lastModifiedDate: DATES[3] }),
        row('FAQ Retriever', { type: 'Keyword', dataSource: 'Knowledge Base', status: 'Inactive', lastModifiedDate: DATES[0] }),
        row('Document Retriever', { type: 'Semantic', dataSource: 'Document Index', status: 'Active', lastModifiedDate: DATES[2] }),
        row('Lead Context Retriever', { type: 'Keyword', dataSource: 'Lead Index', status: 'Active', lastModifiedDate: DATES[1] }),
        row('Conversation Retriever', { type: 'Semantic', dataSource: 'Conversation Index', status: 'Active', lastModifiedDate: DATES[3] })
      ]
    },
    prompts: {
      title: 'All Prompts',
      newButtonLabel: 'New Prompt',
      detailPageUrl: 'prompt-detail.html',
      listPageUrl: 'prompts.html',
      pathPrefix: 'prompts',
      icon: 'prompt_builder',
      sectionIcon: 'prompt_builder',
      columns: [
        { key: 'name', label: 'Prompt Name' },
        { key: 'type', label: 'Type' },
        { key: 'createdBy', label: 'Created By', avatar: true },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'lastModifiedDate', label: 'Last Modified Date' }
      ],
      rows: [
        row('Welcome Prompt', { type: 'Conversation', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Case Summary', { type: 'Classification', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('Lead Qualification', { type: 'Conversation', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Email Triage', { type: 'Classification', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('Product Recommendation', { type: 'Recommendation', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Escalation Decision', { type: 'Classification', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('Meeting Scheduler', { type: 'Conversation', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Sentiment Analysis', { type: 'Classification', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] }),
        row('FAQ Answer', { type: 'Conversation', createdBy: CREATED_BY, createdDate: DATES[0], lastModifiedDate: DATES[1] }),
        row('Next Best Action', { type: 'Recommendation', createdBy: CREATED_BY, createdDate: DATES[2], lastModifiedDate: DATES[3] })
      ]
    },
    'test-suites': {
      title: 'Test Suites',
      newButtonLabel: 'New Suite',
      detailPageUrl: 'test-suite-detail.html',
      listPageUrl: 'test-suites.html',
      pathPrefix: 'test-suites',
      icon: 'table',
      sectionIcon: 'table',
      columns: [
        { key: 'name', label: 'Suite Name' },
        { key: 'testCount', label: 'Test Count' },
        { key: 'passRate', label: 'Pass Rate' },
        { key: 'lastRun', label: 'Last Run' },
        { key: 'createdBy', label: 'Created By', avatar: true }
      ],
      rows: [
        row('Agent Regression Suite', { testCount: '45', passRate: '98%', lastRun: DATES[2], createdBy: CREATED_BY }),
        row('Prompt Accuracy Suite', { testCount: '120', passRate: '94%', lastRun: DATES[0], createdBy: CREATED_BY }),
        row('E2E Flows', { testCount: '28', passRate: '100%', lastRun: DATES[3], createdBy: CREATED_BY }),
        row('Integration Tests', { testCount: '62', passRate: '87%', lastRun: DATES[1], createdBy: CREATED_BY }),
        row('Retriever Quality', { testCount: '35', passRate: '91%', lastRun: DATES[2], createdBy: CREATED_BY }),
        row('Conversation Suite', { testCount: '80', passRate: '96%', lastRun: DATES[0], createdBy: CREATED_BY }),
        row('Performance Suite', { testCount: '15', passRate: '100%', lastRun: DATES[3], createdBy: CREATED_BY }),
        row('Security Tests', { testCount: '22', passRate: '100%', lastRun: DATES[1], createdBy: CREATED_BY }),
        row('Smoke Tests', { testCount: '12', passRate: '100%', lastRun: DATES[2], createdBy: CREATED_BY }),
        row('Data Quality Suite', { testCount: '40', passRate: '88%', lastRun: DATES[0], createdBy: CREATED_BY })
      ]
    },
    metrics: {
      title: 'Metrics',
      newButtonLabel: 'New Metric',
      detailPageUrl: 'metric-detail.html',
      listPageUrl: 'metrics.html',
      pathPrefix: 'metrics',
      icon: 'chart',
      sectionIcon: 'table',
      columns: [
        { key: 'name', label: 'Metric Name' },
        { key: 'type', label: 'Type' },
        { key: 'target', label: 'Target' },
        { key: 'currentValue', label: 'Current Value' },
        { key: 'lastUpdated', label: 'Last Updated' }
      ],
      rows: [
        row('Response Latency', { type: 'Latency', target: '< 2s', currentValue: '1.4s', lastUpdated: DATES[3] }),
        row('Accuracy Score', { type: 'Accuracy', target: '> 95%', currentValue: '96.2%', lastUpdated: DATES[1] }),
        row('Token Usage', { type: 'Consumption', target: '< 10k/day', currentValue: '8,200', lastUpdated: DATES[0] }),
        row('Intent Match Rate', { type: 'Accuracy', target: '> 90%', currentValue: '92%', lastUpdated: DATES[2] }),
        row('First Response Time', { type: 'Latency', target: '< 1s', currentValue: '0.8s', lastUpdated: DATES[3] }),
        row('Escalation Rate', { type: 'Volume', target: '< 5%', currentValue: '3.2%', lastUpdated: DATES[1] }),
        row('Satisfaction Score', { type: 'Accuracy', target: '> 4.0', currentValue: '4.2', lastUpdated: DATES[0] }),
        row('API Error Rate', { type: 'Reliability', target: '< 0.1%', currentValue: '0.05%', lastUpdated: DATES[2] }),
        row('Retrieval Relevance', { type: 'Accuracy', target: '> 85%', currentValue: '88%', lastUpdated: DATES[3] }),
        row('Session Duration', { type: 'Latency', target: '< 5 min', currentValue: '3.2 min', lastUpdated: DATES[1] })
      ]
    },
    'sessions-intents': {
      title: 'Sessions & Intents',
      newButtonLabel: 'New Session',
      detailPageUrl: 'session-detail.html',
      listPageUrl: 'sessions-intents.html',
      pathPrefix: 'sessions-intents',
      icon: 'chart',
      sectionIcon: 'chart',
      columns: [
        { key: 'sessionId', label: 'Session ID' },
        { key: 'agent', label: 'Agent' },
        { key: 'intent', label: 'Intent' },
        { key: 'started', label: 'Started' },
        { key: 'duration', label: 'Duration' },
        { key: 'status', label: 'Status' }
      ],
      nameKey: 'sessionId',
      rows: [
        { sessionId: 'Sess_8f2a', agent: 'Service Agent', intent: 'Book meeting', started: DATES[0], duration: '2m 15s', status: 'Completed' },
        { sessionId: 'Sess_1b3c', agent: 'Customer Success Agent', intent: 'Check order', started: DATES[2], duration: '1m 40s', status: 'Completed' },
        { sessionId: 'Sess_9d4e', agent: 'Support Agent', intent: 'Reset password', started: DATES[1], duration: '—', status: 'In Progress' },
        { sessionId: 'Sess_5e6f', agent: 'Sales Agent', intent: 'Quote request', started: DATES[3], duration: '4m 20s', status: 'Completed' },
        { sessionId: 'Sess_2a7b', agent: 'Service Agent', intent: 'Cancel subscription', started: DATES[0], duration: '3m 00s', status: 'Failed' },
        { sessionId: 'Sess_8c9d', agent: 'Billing Agent', intent: 'Invoice inquiry', started: DATES[2], duration: '1m 55s', status: 'Completed' },
        { sessionId: 'Sess_0e1f', agent: 'Onboarding Agent', intent: 'Setup help', started: DATES[1], duration: '—', status: 'In Progress' },
        { sessionId: 'Sess_3b2c', agent: 'Integration Agent', intent: 'API error', started: DATES[3], duration: '5m 10s', status: 'Completed' },
        { sessionId: 'Sess_6d4e', agent: 'Service Agent', intent: 'Product info', started: DATES[0], duration: '0m 45s', status: 'Completed' },
        { sessionId: 'Sess_7f5a', agent: 'Compliance Agent', intent: 'Policy question', started: DATES[2], duration: '2m 30s', status: 'Completed' }
      ]
    }
  };

  global.LIST_CONFIG = LIST_CONFIG;
  global.LIST_AVATAR_URL = AVATAR_URL;
  global.nameToSlug = nameToSlug;
})(typeof window !== 'undefined' ? window : this);
