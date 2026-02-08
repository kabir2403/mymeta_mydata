/**
 * AI Feature Manager Configuration
 * Customize feature generation, implementation, and scheduling
 */

export const config = {
  // Feature Generation
  generation: {
    // Number of features to generate per cycle
    featuresPerDay: 3,

    // GPT model to use
    model: 'gpt-3.5-turbo',  // Changed from gpt-4 (requires paid account)

    // Temperature controls creativity (0-1)
    // Higher = more creative, Lower = more consistent
    temperature: 0.7,

    // Maximum tokens for generation prompt
    maxTokens: 1500,

    // Feature categories to focus on
    categories: [
      'UI Enhancement',
      'Analytics',
      'Automation',
      'User Experience',
      'Performance',
      'Security',
      'Integration',
    ],

    // System prompt template (can be customized)
    systemPrompt: `You are an innovative AI product manager. Generate features that are:
1. Practical and implementable in Next.js/React
2. Add real value to users
3. Modern and trendy
4. Diverse in purpose`,
  },

  // Feature Implementation
  implementation: {
    // Temperature for code generation
    temperature: 0.5,

    // Max tokens for implementation
    maxTokens: 2000,

    // Always generate these library imports
    defaultImports: [
      "import { useState, useEffect } from 'react'",
      "// Tailwind CSS pre-configured",
    ],

    // Styling framework
    cssFramework: 'tailwind', // 'tailwind' | 'styled-components' | 'css-modules'

    // Auto-implement features with this priority or higher
    autoImplementMinPriority: 'High', // 'High' | 'Medium' | 'Low'
  },

  // Scheduler Configuration
  scheduler: {
    // UTC hour to run (0-23)
    hourUTC: 2,

    // Minute to run
    minuteUTC: 0,

    // Enable/disable automatic scheduling
    enabled: true,

    // Run on deployment (first time)
    runOnStartup: false,

    // Allow manual triggers
    allowManualTrigger: true,
  },

  // Database Configuration
  database: {
    // Storage type: 'json' | 'mongodb' | 'postgresql'
    type: 'json',

    // Path for JSON storage (if using json type)
    jsonPath: 'data/features.json',

    // Keep feature history (in days)
    retentionDays: 365,

    // Auto-cleanup old features
    autoCleanup: true,
  },

  // UI Dashboard Settings
  dashboard: {
    // Refresh interval in milliseconds
    refreshInterval: 5000,

    // Features to display per page
    itemsPerPage: 10,

    // Dark/Light theme
    theme: 'dark', // 'dark' | 'light'

    // Show system logs
    showLogs: true,

    // Max log entries to display
    maxLogs: 50,
  },

  // Advanced Options
  advanced: {
    // Enable debug logging
    debug: false,

    // Log all API calls
    logApiCalls: false,

    // Retry failed implementations
    retryFailedImplementations: true,

    // Max retries
    maxRetries: 3,

    // Timeout for API calls (ms)
    apiTimeout: 30000,

    // Custom component output directory
    componentOutputDir: 'app/components',

    // Version control integration
    versionControl: {
      enabled: true,
      autoCommit: true,
      commitMessage: '🤖 Auto: Generated features on {date}',
    },
  },

  // Feature Validation Rules
  validation: {
    // Minimum feature name length
    minNameLength: 3,

    // Maximum feature name length
    maxNameLength: 50,

    // Require description
    requireDescription: true,

    // Require category
    requireCategory: true,

    // Require priority
    requirePriority: true,

    // Allowed priorities
    allowedPriorities: ['High', 'Medium', 'Low'],

    // Allowed categories
    allowedCategories: [
      'UI Enhancement',
      'Analytics',
      'Automation',
      'User Experience',
      'Performance',
      'Security',
      'Integration',
      'Other',
    ],
  },

  // Notification Settings
  notifications: {
    // Send notifications on new features
    enabled: false,

    // Email notifications
    email: {
      enabled: false,
      recipients: [],
    },

    // Slack notifications
    slack: {
      enabled: false,
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
    },

    // Discord notifications
    discord: {
      enabled: false,
      webhookUrl: process.env.DISCORD_WEBHOOK_URL,
    },
  },
};

/**
 * Get current configuration
 * Can be overridden by environment variables
 */
export function getConfig() {
  return {
    ...config,
    // Override with env variables if present
    generation: {
      ...config.generation,
      model: process.env.AI_MODEL || config.generation.model,
      temperature: parseFloat(process.env.AI_TEMPERATURE || config.generation.temperature),
    },
    scheduler: {
      ...config.scheduler,
      hourUTC: parseInt(process.env.SCHEDULER_HOUR_UTC || config.scheduler.hourUTC),
      enabled: process.env.SCHEDULER_ENABLED !== 'false',
    },
  };
}
