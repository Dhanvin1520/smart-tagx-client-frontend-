#!/usr/bin/env node

import axios from 'axios';

const AUTH_API_URL = 'http://127.0.0.1:3001';
const NLP_API_URL = 'http://127.0.0.1:8000';

console.log('🧪 SmartTagX Integration Test');
console.log('============================\n');

async function testAuthBackend() {
  console.log('1. Testing Auth Backend...');
  try {
    const response = await axios.get(`${AUTH_API_URL}/health`);
    console.log('✅ Auth backend is running');
    console.log(`   Status: ${response.data.message}\n`);
    return true;
  } catch (error) {
    console.log('❌ Auth backend is not running');
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

async function testNLPBackend() {
  console.log('2. Testing NLP Backend...');
  try {
    const response = await axios.get(`${NLP_API_URL}/health`);
    console.log('✅ NLP backend is running');
    console.log(`   Status: ${response.data.status}\n`);
    return true;
  } catch (error) {
    console.log('❌ NLP backend is not running');
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

async function testUserRegistration() {
  console.log('3. Testing User Registration...');
  try {
    const response = await axios.post(`${AUTH_API_URL}/api/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ User registration successful');
    console.log(`   User ID: ${response.data.data.user.id}`);
    console.log(`   Email: ${response.data.data.user.email}\n`);
    return response.data.data.tokens.accessToken;
  } catch (error) {
    console.log('❌ User registration failed');
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return null;
  }
}

async function testNLPAPI() {
  console.log('4. Testing NLP API...');
  try {
    const response = await axios.post(`${NLP_API_URL}/api/generate-tags`, {
      text: 'Apple Inc. announced new AI features for iPhone 15. The CEO Tim Cook spoke about machine learning advancements.'
    });
    console.log('✅ NLP API working successfully');
    console.log(`   Generated ${response.data.tags.length} tags:`);
    response.data.tags.slice(0, 5).forEach(tag => {
      console.log(`     - ${tag}`);
    });
    if (response.data.tags.length > 5) {
      console.log(`     ... and ${response.data.tags.length - 5} more`);
    }
    console.log('');
    return true;
  } catch (error) {
    console.log('❌ NLP API failed');
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return false;
  }
}

async function runTests() {
  const authRunning = await testAuthBackend();
  const nlpRunning = await testNLPBackend();
  
  if (authRunning && nlpRunning) {
    await testUserRegistration();
    await testNLPAPI();
    
    console.log('🎉 Integration test completed!');
    console.log('All services are running and communicating properly.');
  } else {
    console.log('❌ Some services are not running. Please check the logs above.');
  }
}

runTests().catch(console.error);
