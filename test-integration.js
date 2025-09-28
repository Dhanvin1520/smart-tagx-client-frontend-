#!/usr/bin/env node

import axios from 'axios';
import colors from 'colors';

const AUTH_API_URL = 'http://localhost:3001';
const NLP_API_URL = 'http://localhost:8000';
const FRONTEND_URL = 'http://localhost:5175';

console.log('🧪 SmartTagX Integration Test Suite'.cyan.bold);
console.log('=====================================\n');

// Test configuration
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

let authToken = null;
let refreshToken = null;

// Helper function to make requests
async function makeRequest(method, url, data = null, headers = {}) {
  try {
    const config = { method, url, headers };
    if (data) config.data = data;
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message,
      status: error.response?.status || 500
    };
  }
}

// Test functions
async function testAuthBackendHealth() {
  console.log('1. Testing Auth Backend Health...'.yellow);
  
  const result = await makeRequest('GET', `${AUTH_API_URL}/health`);
  
  if (result.success) {
    console.log('✅ Auth backend is running'.green);
    console.log(`   Status: ${result.data.message}`);
    console.log(`   Environment: ${result.data.environment}\n`);
    return true;
  } else {
    console.log('❌ Auth backend is not running'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testNLPBackendHealth() {
  console.log('2. Testing NLP Backend Health...'.yellow);
  
  const result = await makeRequest('GET', `${NLP_API_URL}/health`);
  
  if (result.success) {
    console.log('✅ NLP backend is running'.green);
    console.log(`   Status: ${result.data.status}\n`);
    return true;
  } else {
    console.log('❌ NLP backend is not running'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testUserRegistration() {
  console.log('3. Testing User Registration...'.yellow);
  
  const result = await makeRequest('POST', `${AUTH_API_URL}/api/auth/register`, testUser);
  
  if (result.success) {
    console.log('✅ User registration successful'.green);
    console.log(`   User ID: ${result.data.data.user.id}`);
    console.log(`   Email: ${result.data.data.user.email}`);
    
    // Store tokens for later tests
    authToken = result.data.data.tokens.accessToken;
    refreshToken = result.data.data.tokens.refreshToken;
    console.log('   Tokens stored for further testing\n');
    return true;
  } else {
    console.log('❌ User registration failed'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testUserLogin() {
  console.log('4. Testing User Login...'.yellow);
  
  const result = await makeRequest('POST', `${AUTH_API_URL}/api/auth/login`, {
    email: testUser.email,
    password: testUser.password
  });
  
  if (result.success) {
    console.log('✅ User login successful'.green);
    console.log(`   User: ${result.data.data.user.name}`);
    console.log(`   Plan: ${result.data.data.user.subscription.plan}`);
    console.log(`   API Usage: ${result.data.data.user.apiUsage.requestsThisMonth}/${result.data.data.user.apiUsage.monthlyLimit}\n`);
    return true;
  } else {
    console.log('❌ User login failed'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testGetUserProfile() {
  console.log('5. Testing Get User Profile...'.yellow);
  
  if (!authToken) {
    console.log('❌ No auth token available'.red);
    return false;
  }
  
  const result = await makeRequest('GET', `${AUTH_API_URL}/api/auth/me`, null, {
    'Authorization': `Bearer ${authToken}`
  });
  
  if (result.success) {
    console.log('✅ User profile retrieved successfully'.green);
    console.log(`   Name: ${result.data.data.user.name}`);
    console.log(`   Email: ${result.data.data.user.email}`);
    console.log(`   Role: ${result.data.data.user.role}\n`);
    return true;
  } else {
    console.log('❌ Failed to get user profile'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testNLPAPIWithAuth() {
  console.log('6. Testing NLP API with Authentication...'.yellow);
  
  const testText = "Apple Inc. announced new AI features for iPhone 15. The CEO Tim Cook spoke about machine learning advancements.";
  
  const result = await makeRequest('POST', `${NLP_API_URL}/api/generate-tags`, {
    text: testText
  });
  
  if (result.success) {
    console.log('✅ NLP API working successfully'.green);
    console.log(`   Generated ${result.data.tags.length} tags:`);
    result.data.tags.slice(0, 5).forEach(tag => {
      console.log(`     - ${tag}`);
    });
    if (result.data.tags.length > 5) {
      console.log(`     ... and ${result.data.tags.length - 5} more`);
    }
    console.log('');
    return true;
  } else {
    console.log('❌ NLP API failed'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testTokenRefresh() {
  console.log('7. Testing Token Refresh...'.yellow);
  
  if (!refreshToken) {
    console.log('❌ No refresh token available'.red);
    return false;
  }
  
  const result = await makeRequest('POST', `${AUTH_API_URL}/api/auth/refresh`, {
    refreshToken: refreshToken
  });
  
  if (result.success) {
    console.log('✅ Token refresh successful'.green);
    console.log('   New access token received\n');
    return true;
  } else {
    console.log('❌ Token refresh failed'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testLogout() {
  console.log('8. Testing User Logout...'.yellow);
  
  if (!authToken) {
    console.log('❌ No auth token available'.red);
    return false;
  }
  
  const result = await makeRequest('POST', `${AUTH_API_URL}/api/auth/logout`, null, {
    'Authorization': `Bearer ${authToken}`
  });
  
  if (result.success) {
    console.log('✅ User logout successful'.green);
    console.log('   User logged out successfully\n');
    return true;
  } else {
    console.log('❌ User logout failed'.red);
    console.log(`   Error: ${result.error}\n`);
    return false;
  }
}

async function testFrontendAccess() {
  console.log('9. Testing Frontend Access...'.yellow);
  
  try {
    const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
    if (response.status === 200) {
      console.log('✅ Frontend is accessible'.green);
      console.log(`   URL: ${FRONTEND_URL}\n`);
      return true;
    }
  } catch (error) {
    console.log('❌ Frontend is not accessible'.red);
    console.log(`   URL: ${FRONTEND_URL}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Main test runner
async function runTests() {
  const tests = [
    testAuthBackendHealth,
    testNLPBackendHealth,
    testUserRegistration,
    testUserLogin,
    testGetUserProfile,
    testNLPAPIWithAuth,
    testTokenRefresh,
    testLogout,
    testFrontendAccess
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const result = await test();
    if (result) passed++;
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('📊 Test Results'.cyan.bold);
  console.log('===============');
  console.log(`Passed: ${passed}/${total}`.green);
  console.log(`Failed: ${total - passed}/${total}`.red);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! Integration is working correctly.'.green.bold);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.'.yellow.bold);
  }
}

// Check if required packages are installed
function checkDependencies() {
  try {
    import('axios');
    import('colors');
    return true;
  } catch (error) {
    console.log('❌ Missing dependencies. Installing...'.yellow);
    return false;
  }
}

// Install dependencies if needed
async function installDependencies() {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);
  
  try {
    console.log('Installing axios and colors...');
    await execAsync('npm install axios colors');
    console.log('✅ Dependencies installed');
    return true;
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    return false;
  }
}

// Main execution
async function main() {
  if (!checkDependencies()) {
    const installed = await installDependencies();
    if (!installed) {
      console.log('Please install dependencies manually: npm install axios colors');
      process.exit(1);
    }
  }
  
  await runTests();
}

main().catch(console.error);
