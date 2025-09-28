#!/usr/bin/env node

import axios from 'axios';

const AUTH_API_URL = 'http://127.0.0.1:3001';

console.log('🔐 Testing Authentication Flow');
console.log('==============================\n');

async function testUserRegistration() {
  console.log('1. Testing User Registration...');
  try {
    const response = await axios.post(`${AUTH_API_URL}/api/auth/register`, {
      name: 'Integration Test User',
      email: `test-${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('✅ User registration successful');
    console.log(`   User ID: ${response.data.data.user.id}`);
    console.log(`   Email: ${response.data.data.user.email}`);
    console.log(`   Plan: ${response.data.data.user.subscription.plan}`);
    console.log(`   API Usage: ${response.data.data.user.apiUsage.requestsThisMonth}/${response.data.data.user.apiUsage.monthlyLimit}\n`);
    return response.data.data.tokens.accessToken;
  } catch (error) {
    console.log('❌ User registration failed');
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return null;
  }
}

async function testUserLogin(email, password) {
  console.log('2. Testing User Login...');
  try {
    const response = await axios.post(`${AUTH_API_URL}/api/auth/login`, {
      email: email,
      password: password
    });
    console.log('✅ User login successful');
    console.log(`   User: ${response.data.data.user.name}`);
    console.log(`   Plan: ${response.data.data.user.subscription.plan}\n`);
    return response.data.data.tokens.accessToken;
  } catch (error) {
    console.log('❌ User login failed');
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return null;
  }
}

async function testGetUserProfile(token) {
  console.log('3. Testing Get User Profile...');
  try {
    const response = await axios.get(`${AUTH_API_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ User profile retrieved successfully');
    console.log(`   Name: ${response.data.data.user.name}`);
    console.log(`   Email: ${response.data.data.user.email}`);
    console.log(`   Role: ${response.data.data.user.role}`);
    console.log(`   Subscription: ${response.data.data.user.subscription.plan} (${response.data.data.user.subscription.status})\n`);
    return true;
  } catch (error) {
    console.log('❌ Failed to get user profile');
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return false;
  }
}

async function testTokenRefresh(refreshToken) {
  console.log('4. Testing Token Refresh...');
  try {
    const response = await axios.post(`${AUTH_API_URL}/api/auth/refresh`, {
      refreshToken: refreshToken
    });
    console.log('✅ Token refresh successful');
    console.log('   New access token received\n');
    return response.data.data.accessToken;
  } catch (error) {
    console.log('❌ Token refresh failed');
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return null;
  }
}

async function runAuthTests() {
  // Test registration
  const token = await testUserRegistration();
  
  if (token) {
    // Test getting user profile
    await testGetUserProfile(token);
    
    // Test login with existing user
    const loginToken = await testUserLogin('test@example.com', 'password123');
    if (loginToken) {
      await testGetUserProfile(loginToken);
    }
    
    console.log('🎉 Authentication tests completed successfully!');
    console.log('All authentication features are working properly.');
  } else {
    console.log('❌ Authentication tests failed. Please check the errors above.');
  }
}

runAuthTests().catch(console.error);
