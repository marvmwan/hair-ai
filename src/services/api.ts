import { FunnelAnswers } from '../contexts/FunnelContext';
import { storage, StorageKeys } from '../utils/storage';

// Mock API endpoints
const API_BASE_URL = 'https://api.hairstyleai.com'; // Mock URL

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface HairAnalysisResult {
  faceShape: string;
  hairType: string;
  recommendedStyles: string[];
  products: string[];
  barberInstructions: string;
  confidence: number;
}

// Mock delay function
const mockDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: UserProfile }>> {
    await mockDelay();
    
    // Mock successful login
    const mockUser: UserProfile = {
      id: 'user_123',
      email,
      name: 'John Doe',
      createdAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    return {
      success: true,
      data: {
        token: mockToken,
        user: mockUser,
      },
    };
  },

  async register(email: string, password: string, name: string): Promise<ApiResponse<{ token: string; user: UserProfile }>> {
    await mockDelay();
    
    // Mock successful registration
    const mockUser: UserProfile = {
      id: 'user_' + Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    return {
      success: true,
      data: {
        token: mockToken,
        user: mockUser,
      },
    };
  },

  // Funnel data submission
  async submitFunnelData(data: FunnelAnswers): Promise<ApiResponse<{ analysisId: string }>> {
    await mockDelay(2000);
    
    console.log('Submitting funnel data:', data);
    
    return {
      success: true,
      data: {
        analysisId: 'analysis_' + Date.now(),
      },
    };
  },

  // Hair analysis
  async analyzeHairImage(imageUri: string, funnelAnswers: FunnelAnswers): Promise<ApiResponse<HairAnalysisResult>> {
    await mockDelay(3000); // Simulate longer processing time
    
    console.log('Analyzing hair image:', imageUri);
    
    // Mock analysis result based on funnel answers
    const mockResult: HairAnalysisResult = {
      faceShape: 'Oval',
      hairType: 'Wavy',
      recommendedStyles: ['Layered Cut', 'Side Part', 'Textured Crop'],
      products: ['Texturizing Spray', 'Light Hold Gel', 'Moisturizing Shampoo'],
      barberInstructions: 'Ask for a layered cut with texture on top, keep sides shorter but not too tight.',
      confidence: 0.92,
    };
    
    return {
      success: true,
      data: mockResult,
    };
  },

  // Payment processing
  async processPayment(planId: string): Promise<ApiResponse<{ transactionId: string }>> {
    await mockDelay(2000);
    
    console.log('Processing payment for plan:', planId);
    
    // Mock successful payment
    return {
      success: true,
      data: {
        transactionId: 'txn_' + Date.now(),
      },
    };
  },

  // User profile
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    await mockDelay();
    
    const userId = await storage.getItem(StorageKeys.USER_ID);
    
    const mockUser: UserProfile = {
      id: userId || 'user_123',
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockUser,
    };
  },

  // Hair recommendations
  async getHairRecommendations(): Promise<ApiResponse<{ recommendations: string[] }>> {
    await mockDelay();
    
    const mockRecommendations = [
      'Try a new styling product',
      'Consider a trim every 6-8 weeks',
      'Use a deep conditioning treatment weekly',
      'Experiment with different parting styles',
    ];
    
    return {
      success: true,
      data: {
        recommendations: mockRecommendations,
      },
    };
  },

  // Error simulation
  async simulateError(): Promise<ApiResponse> {
    await mockDelay();
    
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  },
};