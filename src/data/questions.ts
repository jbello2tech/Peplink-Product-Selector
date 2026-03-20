import { WizardAnswers } from '@/lib/types';

export interface QuestionOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface Question {
  id: keyof WizardAnswers;
  step: number;
  title: string;
  subtitle: string;
  multiSelect: boolean;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'deploymentType',
    step: 1,
    title: 'Where will this router be deployed?',
    subtitle: 'Select the environment that best describes your use case.',
    multiSelect: false,
    options: [
      { value: 'mobile_vehicle', label: 'Mobile / Vehicle', description: 'Fleet, van, bus, boat, or any moving platform', icon: '🚐' },
      { value: 'home_soho', label: 'Home / Small Office', description: 'Residential or office with up to ~10 users', icon: '🏠' },
      { value: 'medium_business', label: 'Medium Business', description: 'Office or branch with 10–200 users', icon: '🏢' },
      { value: 'enterprise', label: 'Enterprise / Campus', description: 'Large organization with 200+ users or multiple sites', icon: '🏛️' },
    ],
  },
  {
    id: 'numWANs',
    step: 2,
    title: 'How many WAN connections do you need?',
    subtitle: 'WAN connections include internet lines, cellular, and satellite.',
    multiSelect: false,
    options: [
      { value: '1', label: 'One WAN', description: 'Single internet connection', icon: '1️⃣' },
      { value: '2', label: 'Two WANs', description: 'Dual connection for redundancy or bonding', icon: '2️⃣' },
      { value: '3plus', label: 'Three or more', description: 'Maximum redundancy and load balancing', icon: '3️⃣' },
    ],
  },
  {
    id: 'wanTypes',
    step: 3,
    title: 'What type(s) of WAN connections will you use?',
    subtitle: 'Select all that apply. Cellular includes SIM-based LTE/5G.',
    multiSelect: true,
    options: [
      { value: 'cellular_lte', label: 'Cellular LTE', description: '4G LTE via SIM card', icon: '📶' },
      { value: '5g', label: '5G Cellular', description: 'Sub-6 GHz or mmWave 5G via SIM', icon: '5️⃣' },
      { value: 'dsl_cable', label: 'DSL / Cable', description: 'Traditional broadband via modem', icon: '🔌' },
      { value: 'fiber', label: 'Fiber', description: 'Fiber optic internet connection', icon: '💡' },
      { value: 'satellite', label: 'Satellite', description: 'Starlink, VSAT, or other satellite', icon: '🛰️' },
    ],
  },
  {
    id: 'cellularGen',
    step: 4,
    title: 'What cellular generation do you need?',
    subtitle: '5G offers higher speeds but requires a compatible modem and carrier coverage.',
    multiSelect: false,
    options: [
      { value: 'lte_only', label: 'LTE (4G) is fine', description: 'Widely available, cost-effective, up to ~150 Mbps', icon: '📡' },
      { value: '5g_needed', label: '5G required', description: 'Need Sub-6 GHz 5G speeds (1–3 Gbps)', icon: '🚀' },
    ],
  },
  {
    id: 'userCount',
    step: 5,
    title: 'How many users will this router serve?',
    subtitle: 'Includes all devices: computers, phones, tablets, and IoT.',
    multiSelect: false,
    options: [
      { value: 'under10', label: 'Under 10', description: 'Home, SOHO, or single vehicle', icon: '👤' },
      { value: '10to50', label: '10 – 50 users', description: 'Small to mid-size office', icon: '👥' },
      { value: '50to200', label: '50 – 200 users', description: 'Medium business or branch office', icon: '🏬' },
      { value: '200plus', label: '200+ users', description: 'Enterprise, campus, or data center', icon: '🏛️' },
    ],
  },
  {
    id: 'speedFusion',
    step: 6,
    title: 'Do you need WAN bonding or SpeedFusion?',
    subtitle: 'SpeedFusion combines multiple WAN connections into one fast, reliable tunnel.',
    multiSelect: false,
    options: [
      { value: 'yes', label: 'Yes, needed', description: 'I need bonding, hot failover, or VPN tunneling', icon: '⚡' },
      { value: 'no', label: 'No, not needed', description: 'Standard routing and failover is enough', icon: '✅' },
      { value: 'not_sure', label: "Not sure", description: "I'd like to understand my options", icon: '❓' },
    ],
  },
  {
    id: 'budgetRange',
    step: 7,
    title: 'What is your approximate budget?',
    subtitle: 'This is the one-time hardware cost (excluding subscription services).',
    multiSelect: false,
    options: [
      { value: 'under500', label: 'Under $500', description: 'Entry-level devices', icon: '💵' },
      { value: '500to1500', label: '$500 – $1,500', description: 'Mid-range devices', icon: '💰' },
      { value: '1500to5000', label: '$1,500 – $5,000', description: 'Business-grade devices', icon: '💳' },
      { value: '5000plus', label: '$5,000+', description: 'Enterprise or carrier-grade', icon: '🏦' },
    ],
  },
  {
    id: 'wifiNeeded',
    step: 8,
    title: 'Do you need built-in Wi-Fi?',
    subtitle: 'Some Peplink models include an integrated access point; others are router-only.',
    multiSelect: false,
    options: [
      { value: 'yes', label: 'Yes, built-in Wi-Fi', description: "I want Wi-Fi included in the router", icon: '📶' },
      { value: 'no', label: 'No, wired only', description: 'I use separate APs or only wired devices', icon: '🔗' },
    ],
  },
];
