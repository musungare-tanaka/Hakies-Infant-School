import { school } from '@/data/school';

const baseNav = [
  { label: 'Home', href: '/#home' }, { label: 'About', href: '/#about' }, { label: 'Learning', href: '/#learning' },
  { label: 'School Life', href: '/#school-life' }, { label: 'Contact', href: '/#contact' },
];
const optionalNav = [
  { label: 'Staff', href: '/staff', enabled: school.pages.staff },
  { label: 'Facilities', href: '/facilities', enabled: school.pages.facilities },
  { label: 'Downloads', href: '/downloads', enabled: school.pages.downloads },
  { label: 'Testimonials', href: '/testimonials', enabled: school.pages.testimonials },
  { label: 'Careers', href: '/careers', enabled: school.pages.careers },
];
export const nav = [...baseNav, ...optionalNav.filter((item) => item.enabled)];

export const pageCopy: Record<string, { eyebrow: string; title: string; intro: string; sections: { title: string; text: string; label?: string }[] }> = {
  about: { eyebrow: 'Our purpose', title: 'Growing minds, shaping character.', intro: 'At Hakies, we believe every child can achieve their best, value others and thrive in a changing world.', sections: [
    { title: 'Our vision', text: 'To raise joyful, independent learners who are prepared to lead, serve, and thrive in a changing world.' },
    { title: 'Our mission', text: 'At Hakies Junior School, we cultivate a caring and purposeful learning community where children achieve their best, value others, think creatively, and grow in character every day.' },
    { title: 'Our school motto', text: '“Growing Minds, Shaping Character.”' },
    { title: 'A welcome from the headteacher', text: 'A personal welcome from the headteacher can help families understand what matters most at Hakies. Add an approved message and profile when available.', label: 'Profile not yet supplied' },
  ]},
  learning: { eyebrow: 'Curiosity starts here', title: 'Learning, one discovery at a time', intro: 'Explore how learning is organised at Hakies. Class names, age groups and curriculum details need to be confirmed by the school before publication.', sections: [
    { title: 'Our learning approach', text: 'This section is prepared for approved information about play, creativity, language, discovery and early development.', label: 'Provisional content · school approval needed' },
    { title: 'Classes and age groups', text: 'Class names and age ranges will be added here when confirmed. Please contact the school for current information.', label: 'Details to be confirmed' },
    { title: 'Learning support', text: 'Add approved information about how the school works with families to support each child’s learning and development.', label: 'School information needed' },
  ]},
  'school-life': { eyebrow: 'Life at Hakies', title: 'Little moments, big memories', intro: 'A glimpse of the everyday experiences that make up school life, ready to be brought to life with approved photographs and stories.', sections: [
    { title: 'Stories, making and music', text: 'Add school-approved examples of creative activities, stories, music and classroom projects.', label: 'Example content slot' },
    { title: 'Outside and together', text: 'Share confirmed information and approved images of outdoor play and the ways children spend time together.', label: 'Example content slot' },
    { title: 'Everyday essentials', text: 'Meals, transport, trips and facilities will be described here once the school has confirmed what is available.', label: 'Details to be confirmed' },
  ]},
  parents: { eyebrow: 'For families', title: 'Helpful information for parents', intro: 'Find the practical information families need. These resources will appear once the school has provided approved details and current files.', sections: [
    { title: 'Term dates and school day', text: 'Term dates, arrival and collection times are not yet available. Please check with the school directly.', label: 'To be confirmed' },
    { title: 'Uniform guidance', text: 'Approved uniform guidance and supplier details can be added here.', label: 'Information not supplied' },
    { title: 'Downloads and FAQs', text: 'There are no approved downloadable documents available yet. Parent FAQs will be added as information is confirmed.', label: 'No downloads available' },
  ]},
};

export const galleryItems = [
  { title: 'A bright idea', category: 'Learning', tone: 'yellow', art: '✦' },
  { title: 'Storytime together', category: 'Stories', tone: 'blue', art: '▤' },
  { title: 'Making and creating', category: 'Creative play', tone: 'coral', art: '◒' },
  { title: 'Little discoveries', category: 'Learning', tone: 'mint', art: '✿' },
  { title: 'A world of words', category: 'Stories', tone: 'coral', art: 'Aa' },
  { title: 'Time to imagine', category: 'Creative play', tone: 'blue', art: '☼' },
];
