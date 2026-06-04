# GLOSS - Professional Hair Salon Website

A modern, responsive website for a professional hair salon featuring AI-powered chat support, expressive typography, bold colors, and interactive design elements.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-Bulgarian%20%2F%20English-orange)

## 🌐 Demo Live

👉 **[View Demo Here](https://hairdresser-web-site.vercel.app/)** ← Click to see the live website

## 🎨 Features

### Design & Typography
- **Expressive Typography**: Uses Playfair Display for bold headings and Inter for clean body text
- **Bold Color Palette**: 
  - Primary Red: #E63946
  - Dark Blue: #1D3557
  - Gold Accent: #FFB703
  - Green Accent: #06A77D
- **Gradient Effects**: Modern gradient backgrounds throughout the site
- **Smooth Animations**: Float effects, hover transitions, and scroll animations

### Core Functionality
- 📍 **Sticky Navigation Header** with smooth scroll links
- 🎯 **Hero Section** with compelling call-to-action buttons
- 💇 **Services Showcase** with pricing and descriptions
- 🖼️ **Image Gallery** with hover effects
- ℹ️ **About Section** with statistics and features
- 📞 **Contact Form** with information cards
- 🤖 **AI Chat Assistant** with keyword detection
- 🔗 **Footer** with social links and quick navigation

### Responsive Design
- ✅ Desktop (1200px and above)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (480px - 767px)
- ✅ Small Mobile (below 480px)

### AI Chat Assistant
- Intelligent keyword detection system
- Contextual responses about:
  - Services and pricing
  - Booking and reservations
  - Location and hours
  - General greetings
- Real-time message sending with animations
- Clean, user-friendly chat interface

## 📁 Project Structure

```
Hairdresser-Web-Site/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # JavaScript functionality and AI chat
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No dependencies required (pure HTML, CSS, JavaScript)

### Installation

1. **Clone or Download the Project**
   ```bash
   cd c:\Projects\Hairdresser-Web-Site
   ```

2. **Open in Browser**
   - Double-click `index.html` to open directly
   - Or right-click → "Open with" → Select your browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if you have http-server installed)
     http-server
     ```

3. **Access the Website**
   - Direct: `file:///c:/Projects/Hairdresser-Web-Site/index.html`
   - Local Server: `http://localhost:8000`

## 📖 Usage

### Navigation
- Use the sticky header menu to navigate between sections
- Smooth scroll animations guide you through the page
- Mobile menu collapses on smaller screens

### Booking
- Click "Reserve Now" (Запази Час) button to go to the booking section
- Fill in your details in the contact form
- The form includes validation and confirmation

### AI Chat Assistant
- Click the "💬 AI Assistant" button in the header
- Type your questions about:
  - Services and pricing
  - Booking information
  - Location and hours
  - General inquiries
- The AI recognizes keywords and provides relevant responses

### Services Section
- Browse all offered services with descriptions
- View pricing information
- Each service card has hover effects showing more details

## 🎯 Key Sections

### Header
- Logo and branding
- Navigation menu with smooth scrolling
- AI Chat toggle button
- Booking button

### Hero Section
- Compelling headline: "Transform Yourself in Style"
- Two call-to-action buttons
- Animated avatar placeholder

### Services
- 4 main service categories:
  - Haircuts
  - Coloring (balayage, ombre)
  - Masks & Lamination
  - Permanent Waves
- Price ranges and descriptions
- Interactive hover effects

### Gallery
- 6 showcase items representing different styles
- Hover zoom effects
- Category labels

### About Section
- Company description
- Key features and benefits
- Statistics display:
  - 500+ Satisfied Clients
  - 15 Years Experience
  - 8 Stylists
  - 4.9★ Rating

### Contact Section
- Location with address
- Phone number
- Working hours
- Contact form with fields for:
  - Name
  - Email
  - Message

### Footer
- Company description
- Quick links
- Social media links
- Copyright information

## 🤖 AI Chat System

The AI assistant uses a keyword detection system to provide relevant responses:

### Detected Keywords
- **Services**: Detects keywords like "услуга", "какво", "правите"
- **Booking**: Detects "резервирай", "запази", "час", "време"
- **Pricing**: Detects "цена", "лв", "цени"
- **Location**: Detects "адрес", "където", "местонахождение"
- **Hours**: Detects "отворени", "работно", "време"

### Sample Responses
Each category has multiple response options that are randomly selected for variety.

## 💻 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: 
  - CSS Grid and Flexbox layouts
  - CSS Gradients
  - CSS Animations and Transitions
  - CSS Variables (custom properties)
  - Media queries for responsiveness
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event listeners
  - Intersection Observer API
  - String escaping for security

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #E63946;
    --secondary-color: #A4161A;
    --accent-color: #F1FAEE;
    --dark-color: #1D3557;
    --light-color: #F8F9FA;
    --gold: #FFB703;
    --green: #06A77D;
}
```

### Typography
- Headings: Playfair Display (change in `<head>`)
- Body: Inter (change in `<head>`)
- Adjust font sizes in CSS for different breakpoints

### Content
- Edit service descriptions in the services section
- Update contact information in the footer
- Modify AI responses in `aiResponses` object in `script.js`
- Change gallery items and titles

### AI Responses
Edit the `aiResponses` object in `script.js`:
```javascript
const aiResponses = {
    services: ["Response 1", "Response 2", ...],
    booking: ["Response 1", "Response 2", ...],
    // ... more categories
};
```

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE 11 | ⚠️ Limited |

## 🔒 Security Features

- XSS protection in chat messages via `escapeHtml()` function
- Input validation in forms
- No external API calls (all processing is client-side)

## 🚀 Deployment

### Option 1: GitHub Pages
1. Push files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://username.github.io/repository-name`

### Option 2: Static Hosting (Netlify, Vercel)
1. Connect your GitHub repository
2. Deploy with one click
3. Custom domain support available

### Option 3: Traditional Web Hosting
1. Upload files via FTP
2. No special server requirements (pure HTML/CSS/JS)
3. Works on any web server

## 🐛 Troubleshooting

### Chat not working
- Ensure JavaScript is enabled in browser
- Check browser console for errors (F12)
- Clear browser cache

### Styling looks wrong
- Hard refresh browser (Ctrl+Shift+R)
- Check if all CSS file is loaded (check Network tab)
- Verify file paths are correct

### Links not scrolling smoothly
- Check if browser supports `scroll-behavior: smooth`
- Fallback to instant scroll in older browsers
- Verify anchor IDs match href values

## 📝 Content Sections

### Bulgarian Content (Current)
The website is currently designed with Bulgarian language content including:
- Service names and descriptions in Bulgarian
- Contact information in Bulgarian
- AI responses in Bulgarian
- All UI text in Bulgarian

### Translating to English
To translate the entire site:
1. Replace all Bulgarian text in `index.html`
2. Update AI responses in `script.js`
3. Adjust any culture-specific content

## 🔄 Future Enhancements

- [ ] Online booking system with calendar
- [ ] Image upload for gallery
- [ ] Client testimonials/reviews section
- [ ] Staff profiles
- [ ] Blog section
- [ ] Multi-language support (i18n)
- [ ] Advanced AI using machine learning
- [ ] Payment integration
- [ ] Email notifications
- [ ] Mobile app
- [ ] Social media integration

## 📞 Contact & Support

For the hair salon:
- **Phone**: +359 88 234 5678
- **Address**: ul. Krasotata 42, Sofia
- **Hours**: Mon-Fri: 09:00-19:00, Sat: 10:00-18:00

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💼 Credits

- Design & Development: GLOSS Hair Salon
- Fonts: Google Fonts (Playfair Display, Inter)
- Icons: Unicode Emoji
- Concept: Modern, AI-enhanced salon website

## 📊 Project Statistics

- **Files**: 4 (HTML, CSS, JS, README)
- **Lines of Code**: ~1000+
- **CSS Rules**: 80+
- **JavaScript Functions**: 15+
- **Responsive Breakpoints**: 4
- **Animations**: 6+
- **AI Response Categories**: 6

## 🎓 Learning Resources

This project demonstrates:
- Semantic HTML5 structure
- CSS Grid and Flexbox
- CSS Animations and Transitions
- Responsive Web Design
- Vanilla JavaScript (no frameworks)
- DOM API manipulation
- Event handling
- Intersection Observer API
- Keyboard accessibility

## ✨ Version History

### v1.0.0 - January 14, 2026
- Initial release
- Complete website structure
- AI chat assistant
- Responsive design
- All service sections
- Contact form
- Footer with social links

---

**Enjoy your professional hair salon website! 💇‍♀️✨**
