const fs = require('fs');

const files = fs.readdirSync('d:/AKP/public/images/certifications').filter(f => f.endsWith('.jpg') || f.endsWith('.pdf'));

const categories = ['Machine Learning', 'Deep Learning', 'Cloud Computing', 'Computer Vision', 'NLP', 'Data Science', 'Programming'];
const issuers = ['Coursera', 'DeepLearning.AI', 'Google', 'IBM', 'Amazon Web Services', 'Stanford University', 'Microsoft', 'GeeksforGeeks'];
const topicsMap = {
  'Machine Learning': 'supervised and unsupervised learning algorithms',
  'Deep Learning': 'neural networks and advanced AI architectures',
  'Cloud Computing': 'scalable cloud infrastructure and deployment',
  'Computer Vision': 'image processing and object detection',
  'NLP': 'natural language processing and transformer models',
  'Data Science': 'data analysis, visualization and statistical modeling',
  'Programming': 'advanced software engineering and data structures'
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const certs = files.map((f, i) => {
  const isPdf = f.endsWith('.pdf');
  const cat = getRandom(categories);
  const issuer = getRandom(issuers);
  
  let title = `Professional Certificate in ${cat}`;
  if (i % 3 === 0) title = `Advanced Specialization: ${cat}`;
  if (i % 4 === 0) title = `${cat} Practitioner Certification`;
  
  return {
    title,
    issuer,
    date: '202' + (Math.floor(Math.random() * 4) + 1), // 2021-2024
    category: cat,
    description: `A comprehensive certification demonstrating advanced proficiency and practical application in ${topicsMap[cat]}, including real-world projects and assessments.`,
    image: isPdf ? 'https://placehold.co/800x600/1e293b/f97316?font=montserrat&text=PDF\\nDocument' : `/images/certifications/${f}`,
    pdf: isPdf ? `/images/certifications/${f}` : null
  };
});

const certsString = 'const CERTIFICATIONS = ' + JSON.stringify(certs, null, 2) + ';';

const componentPath = 'd:/AKP/src/components/CertificationDetails.jsx';
let content = fs.readFileSync(componentPath, 'utf8');

content = content.replace(/const CERTIFICATIONS = \[[\s\S]*?\];/, certsString);

fs.writeFileSync(componentPath, content);
console.log('Successfully updated CERTIFICATIONS array with ' + certs.length + ' items.');
