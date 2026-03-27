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
    id: 'wanTypes',
    step: 2,
    title: 'What types of internet connections will you use?',
    subtitle: 'Select all that apply — mix and match for redundancy. Cellular means SIM-based LTE or 5G.',
    multiSelect: true,
    options: [
      { value: 'cellular_lte', label: 'Cellular (LTE / 4G)', description: 'SIM card via a mobile carrier — great for backup or primary on the go', icon: '📶' },
      { value: '5g', label: 'Cellular (5G)', description: 'Next-gen SIM-based connection — faster speeds where 5G is available', icon: '5️⃣' },
      { value: 'dsl_cable', label: 'DSL / Cable', description: 'Traditional broadband via a modem from your ISP', icon: '🔌' },
      { value: 'fiber', label: 'Fiber', description: 'Fiber optic internet — fastest and most reliable wired option', icon: '💡' },
      { value: 'satellite', label: 'Satellite', description: 'Starlink, VSAT, or similar — useful in remote locations', icon: '🛰️' },
    ],
  },
  {
    id: 'numWANs',
    step: 3,
    title: 'How many internet connections do you need?',
    subtitle: 'More connections means better redundancy — if one goes down, others keep you online.',
    multiSelect: false,
    options: [
      { value: '1', label: 'One connection', description: 'Single internet line — simple and cost-effective', icon: '1️⃣' },
      { value: '2', label: 'Two connections', description: 'Dual connection for failover backup or combined speed', icon: '2️⃣' },
      { value: '3plus', label: 'Three or more', description: 'Maximum redundancy — one always stays online', icon: '3️⃣' },
    ],
  },
  {
    id: 'cellularGen',
    step: 4,
    title: 'Which cellular generation do you need?',
    subtitle: '5G offers higher speeds but requires 5G coverage from your carrier and a compatible device.',
    multiSelect: false,
    options: [
      { value: 'lte_only', label: 'LTE (4G) is enough', description: 'Widely available, cost-effective — up to ~150 Mbps', icon: '📡' },
      { value: '5g_needed', label: '5G is required', description: 'Need higher speeds where 5G is available (up to 1–3 Gbps)', icon: '🚀' },
    ],
  },
  {
    id: 'userCount',
    step: 5,
    title: 'How many users will this router serve?',
    subtitle: 'Count all devices: computers, phones, tablets, printers, smart TVs, and IoT devices.',
    multiSelect: false,
    options: [
      { value: 'under10', label: 'Under 10 devices', description: 'Home, small office, or a single vehicle', icon: '👤' },
      { value: '10to50', label: '10 – 50 devices', description: 'Small to mid-size office', icon: '👥' },
      { value: '50to200', label: '50 – 200 devices', description: 'Medium business or branch office', icon: '🏬' },
      { value: '200plus', label: '200+ devices', description: 'Enterprise campus or data center', icon: '🏛️' },
    ],
  },
  {
    id: 'speedFusion',
    step: 6,
    title: 'Do you need connection bonding or always-on failover?',
    subtitle: "SpeedFusion is Peplink's technology that combines multiple internet connections into one super-reliable link.",
    multiSelect: false,
    options: [
      { value: 'yes', label: 'Yes, I need it', description: 'Combine connections for speed or guarantee zero downtime', icon: '⚡' },
      { value: 'no', label: 'No, not needed', description: 'Basic failover (switch to backup if primary fails) is enough', icon: '✅' },
      { value: 'not_sure', label: "Not sure — recommend for me", description: "I'll let the tool decide based on my other answers", icon: '❓' },
    ],
  },
  {
    id: 'wifiNeeded',
    step: 7,
    title: 'Do you need built-in Wi-Fi?',
    subtitle: 'Some Peplink routers include a built-in wireless access point. Others are router-only (you add your own Wi-Fi separately).',
    multiSelect: false,
    options: [
      { value: 'yes', label: 'Yes, built-in Wi-Fi', description: 'I want wireless included — one box does everything', icon: '📶' },
      { value: 'no', label: 'No, wired only', description: 'I use separate access points or only wired devices', icon: '🔗' },
    ],
  },
];
