import { 
  HeartHandshake, Flower2, Brain, Ambulance, 
  UserPlus, Heart, Wrench, Bed, ClipboardList, TestTube, Pill, 
  Apple, Puzzle, ShieldCheck, Stethoscope
} from 'lucide-react';

export const servicesData = [
  {
    id: 1,
    title: "Caregiver Services",
    slug: "caregiver-services",
    description: "Professional caregiver support for daily living activities, companionship, and personal care to help seniors live comfortably at home.",
    icon: <HeartHandshake className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/1. Caregiver Services.webp",
    details: "Personal hygiene assistance, companionship, daily routine support, and household help",
    fullDetails: "Our caregiver services are designed to provide comprehensive, compassionate support for your loved ones in the comfort of their own home. We assign trained, empathetic professionals who assist with daily living activities, ensuring safety and comfort. Beyond physical assistance, our caregivers offer vital companionship, helping to reduce feelings of isolation and depression. We customize our care plans to match the specific needs and schedule of each individual."
  },
  {
    id: 2,
    title: "Nursing Services",
    slug: "nursing-services",
    description: "Skilled nursing care at home including wound care, medication management, and post-operative support by licensed nurses.",
    icon: <Stethoscope className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/11. Care Coordination.webp",
    details: "Wound care, medication schedules, health assessments, IV therapy, and emergency support",
    fullDetails: "Our skilled nursing services bring hospital-level care directly to your doorstep. Licensed and experienced nurses perform a variety of medical procedures including complex wound dressing, catheter care, IV therapies, and post-surgical monitoring. They also work closely with your primary physician to manage chronic conditions, adjust medication schedules safely, and provide regular health assessments to prevent hospital readmissions."
  },
  {
    id: 3,
    title: "Hospice Care",
    slug: "hospice-care",
    description: "Compassionate end-of-life care focused on comfort, dignity, and emotional support for patients and their families.",
    icon: <Flower2 className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/9. Medical Equipment Setup.webp",
    details: "Pain management, emotional counseling, family support, spiritual care, and comfort measures",
    fullDetails: "Our hospice care program focuses on improving the quality of life for patients with life-limiting illnesses. The primary goal is profound comfort and dignity. Our multidisciplinary team—consisting of specialized nurses, counselors, and aides—provides expert pain and symptom management. We also offer deep emotional and spiritual support, not just to the patient, but to the entire family as they navigate this difficult journey."
  },
  {
    id: 4,
    title: "Dementia Care",
    slug: "dementia-care",
    description: "Specialized memory and cognitive care for patients with dementia or Alzheimer's, providing a safe and structured environment.",
    icon: <Brain className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/13. Pharmacy Delivery.webp",
    details: "Memory activities, behavioral support, safe environment, caregiver guidance, and daily routines",
    fullDetails: "Caring for a loved one with dementia or Alzheimer's requires patience, specialized training, and a deep understanding of cognitive decline. Our dementia care specialists create a safe, familiar environment to reduce confusion and anxiety. We implement structured daily routines and engaging memory-stimulating activities that help preserve cognitive function and promote a sense of purpose and calm."
  },
  {
    id: 5,
    title: "Allied Health Visit",
    slug: "allied-health-visit",
    description: "Home visits by allied health professionals including physiotherapists, occupational therapists, and speech therapists.",
    icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/12. Lab Sample Collection.webp",
    details: "Physiotherapy, occupational therapy, speech therapy, rehabilitation, and functional assessments",
    fullDetails: "Recovery and rehabilitation don't have to require stressful trips to a clinic. Our allied health visits bring highly qualified physiotherapists, occupational therapists, and speech therapists directly to your home. Whether recovering from a stroke, a fall, or managing a chronic physical condition, our therapists design customized exercises and interventions to restore mobility, independence, and communication skills."
  },
  {
    id: 6,
    title: "Nurse Visit (On-demand)",
    slug: "nurse-visit",
    description: "On-call and scheduled nurse visits for health monitoring, medication administration, and emergency assessments.",
    icon: <Ambulance className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/3. Hospice Care.webp",
    details: "Vital signs monitoring, on-demand visits, medication checks, and urgent health assessments",
    fullDetails: "Sometimes you just need a professional to check in. Our on-demand nurse visits are perfect for sudden health concerns, routine vital sign checks, or specific medical administration like injections. Our nurses arrive promptly, perform a thorough clinical assessment, administer necessary treatments, and communicate directly with your doctor, giving you peace of mind exactly when you need it."
  },
  {
    id: 7,
    title: "Geriatric Care",
    slug: "geriatric-care",
    description: "Comprehensive care tailored for the elderly, addressing complex health needs and promoting a higher quality of life.",
    icon: <UserPlus className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/10. ICU Setup at Home.webp",
    details: "Geriatric assessments, chronic disease management, fall prevention, and wellness monitoring",
    fullDetails: "Geriatric care focuses on the unique, often complex health needs of the elderly. Our approach is highly holistic, looking at the patient as a whole rather than just treating individual symptoms. We conduct comprehensive geriatric assessments, manage multiple chronic medications to prevent adverse interactions, implement fall-prevention strategies in the home, and focus heavily on maintaining the patient's independence and dignity."
  },
  {
    id: 8,
    title: "Palliative Care",
    slug: "palliative-care",
    description: "Relief-focused care for those with serious illnesses, prioritizing comfort, pain management, and quality of life.",
    icon: <Heart className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/15. Dietician Consultation.webp",
    details: "Pain relief, symptom management, emotional support, care coordination, and family counseling",
    fullDetails: "Palliative care is specialized medical care for people living with a serious illness, focused on providing relief from the symptoms and stress of the illness. It can be provided alongside curative treatment. Our team works to drastically improve the quality of life for both the patient and the family by aggressively managing pain, shortness of breath, fatigue, nausea, and other distressing symptoms."
  },
  {
    id: 9,
    title: "Medical Equipment Setup",
    slug: "medical-equipment",
    description: "Professional setup and management of home medical equipment for patients requiring assisted care at home.",
    icon: <Wrench className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/8. Palliative Care.webp",
    details: "Oxygen setup, hospital beds, wheelchairs, monitoring devices, and equipment training",
    fullDetails: "Transitioning a patient to home care often requires specialized medical equipment. We handle the entire process—from sourcing the highest quality hospital beds, oxygen concentrators, BiPAP machines, and mobility aids, to professional installation in your home. Crucially, our technicians and nurses will train you and your family on how to safely and effectively use all equipment."
  },
  {
    id: 10,
    title: "ICU Setup at Home",
    slug: "icu-setup",
    description: "Advanced home ICU setup for critically ill patients who require hospital-level care in the comfort of their home.",
    icon: <Bed className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/7. Geriatric Care.webp",
    details: "Ventilator support, cardiac monitoring, critical care nursing, and 24/7 medical supervision",
    fullDetails: "For patients requiring intensive, continuous medical supervision, extended hospital stays can be emotionally draining and risk exposure to hospital-acquired infections. Our Home ICU service recreates a critical care environment in your bedroom. We provide advanced equipment like ventilators and cardiac monitors, staffed 24/7 by specialized ICU-trained nurses and supervised by critical care physicians."
  },
  {
    id: 11,
    title: "Care Coordination",
    slug: "care-coordination",
    description: "End-to-end coordination of care services, ensuring seamless communication between caregivers, doctors, and family.",
    icon: <ClipboardList className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/6. Nurse Visit (On-demand).webp",
    details: "Care planning, doctor coordination, family communication, service scheduling, and progress tracking",
    fullDetails: "Managing home healthcare involves many moving parts: scheduling nurses, arranging equipment, ordering pharmacy refills, and keeping the primary doctor updated. Our Care Coordinators act as your single point of contact, seamlessly managing all these logistics. We ensure that every member of the care team is aligned with the patient's care plan, removing the administrative burden from the family."
  },
  {
    id: 12,
    title: "Lab Sample Collection",
    slug: "lab-sample-collection",
    description: "Convenient home-based lab sample collection for diagnostic tests, eliminating the need for hospital visits.",
    icon: <TestTube className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/5. Allied Health Visit.webp",
    details: "Blood tests, urine analysis, swab collections, sample transport, and result delivery",
    fullDetails: "Routine blood work and diagnostic testing shouldn't require a stressful commute and long waiting room times. Our trained phlebotomists come directly to your home at a scheduled time. We follow strict clinical protocols for sample collection, labeling, and secure transportation to accredited laboratories. Your reports are then delivered digitally and can be shared directly with your consulting physician."
  },
  {
    id: 13,
    title: "Pharmacy Delivery",
    slug: "pharmacy-delivery",
    description: "Timely delivery of prescribed medications and medical supplies directly to your doorstep.",
    icon: <Pill className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/4. Dementia Care.webp",
    details: "Prescription fulfillment, medication packaging, delivery scheduling, and refill reminders",
    fullDetails: "Never miss a dose with our reliable home pharmacy delivery service. We manage the sourcing and timely delivery of all your prescribed medications, medical consumables, and nutritional supplements. For patients with complex regimens, we offer specialized medication packaging (like dosette boxes) to ensure the right pills are taken at the right time, minimizing the risk of medication errors."
  },
  {
    id: 15,
    title: "Dietician Consultation",
    slug: "dietician-consultation",
    description: "Personalized dietary counseling and meal planning by certified dieticians for optimal nutrition and health.",
    icon: <Apple className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/2. Nursing Services.webp",
    details: "Nutritional assessments, diet plans, therapeutic nutrition, and ongoing dietary support",
    fullDetails: "Proper nutrition is a cornerstone of recovery and managing chronic illnesses. Our certified clinical dieticians conduct thorough assessments to understand the patient's medical condition, dietary restrictions, and personal preferences. We then design practical, customized meal plans—whether it's for diabetes management, post-surgical recovery, or addressing age-related malnutrition—and provide ongoing support to ensure compliance."
  },
  {
    id: 16,
    title: "Mental Health Counseling",
    slug: "mental-health-counseling",
    description: "Professional mental health support for seniors and families dealing with anxiety, depression, grief, or isolation.",
    icon: <Puzzle className="w-8 h-8 md:w-12 md:h-12" />,
    image: "/images/Abishag_img/16. Mental Health Counseling.webp",
    details: "Individual counseling, family therapy, grief support, stress management, and behavioral health",
    fullDetails: "The emotional toll of aging, chronic illness, or caregiving is often profound. We provide professional mental health counseling in the privacy of your home. Our licensed therapists help seniors cope with issues like isolation, depression, or loss of independence. Equally importantly, we offer robust support and stress management counseling for family members experiencing caregiver burnout."
  },
];
