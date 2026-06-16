export type RoofType = 'concrete' | 'tin-shed' | 'tiles' | 'other';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'survey-scheduled'
  | 'survey-completed'
  | 'proposal-sent'
  | 'converted'
  | 'lost';

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  monthlyBill: number; // in USD or local currency
  avgUsageKwh: number; // average usage in kWh
  roofAreaSqFt: number; // available roof area
  roofType: RoofType;
  status: LeadStatus;
  assignedExecutive: string;
  createdAt: string;
}

export type ConnectionType = 'single-phase' | 'three-phase';
export type StructuralStability = 'excellent' | 'good' | 'poor';

export interface SurveyResponse {
  id: string;
  leadId: string;
  hasShading: boolean;
  connectionType: ConnectionType;
  sanctionedLoadKw: number;
  structuralStability: StructuralStability;
  remarks: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  surveyorName: string;
  surveyDate: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  surveysCompleted: number;
  conversionRate: number; // percentage
  targetLeadsThisMonth: number;
  leadsAchievedThisMonth: number;
}
