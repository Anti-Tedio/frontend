export default {
  // ─── Navigation ───────────────────────────────────────────────
  nav: {
    home: 'Home',
    about: 'About',
    profile: 'Profile',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    settings: 'Settings',
    credits: '{count} credits',
    welcome: 'Welcome to ANTI-TÉDIO!',
    welcomeSubtitle: 'Sign in to get started',
    openMenu: 'Open navigation menu',
    accountMenu: 'Account menu for {name}',
    language: 'language',
  },

  // ─── Footer ───────────────────────────────────────────────────
  footer: {
    tagline: 'We turn idle moments into amazing experiences through artificial intelligence and smart curation.',
    navigation: 'Navigation',
    support: 'Support',
    myAccount: 'My Account',
    explore: 'Explore',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
    copyright: '© {year} Anti-Tédio. All rights reserved.',
  },

  // ─── Auth / Login ─────────────────────────────────────────────
  auth: {
    welcomeBack: 'Welcome back',
    createAccount: 'Create your account',
    signInSubtitle: 'Sign in to continue your experience',
    registerSubtitle: 'Join Anti-Tédio and beat boredom',
    chooseMethod: "Choose how you'd like to sign in",
    continueGoogle: 'Continue with Google',
    continueMeta: 'Continue with Meta',
    signInEmail: 'Sign in with Email',
    termsNotice: 'By continuing, you agree to our {terms} and {privacy}.',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    fullName: 'Full Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    password: 'Password',
    passwordPlaceholder: 'Strong password',
    forgotPassword: 'Forgot your password?',
    submitting: 'Please wait…',
    signInButton: 'Sign In',
    createAccountButton: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signUp: 'Sign Up',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    welcomeTitle: 'Welcome to Anti-Tédio',
    backToMethods: 'Back to sign in methods',
    validationNameRequired: 'Please enter your name',
    validationEmailRequired: 'Please enter your email address',
    validationEmailInvalid: 'Please enter a valid email address',
    validationPasswordRequired: 'Please enter your password',
    validationPasswordMin: 'Password must be at least 8 characters',
  },

  // ─── Forgot Password ──────────────────────────────────────────
  forgotPassword: {
    title: 'Reset Password',
    subtitle: "Enter your email below and we'll send you a magic link to reset your password.",
    emailLabel: 'Email address',
    sendButton: 'Send Reset Link',
    sending: 'Sending…',
    backToLogin: 'Back to sign in',
    successTitle: 'Check your inbox!',
    successMessage: "We sent a reset link to {email}. Don't forget to check your spam folder too.",
    understood: 'Got it, back to sign in',
  },

  // ─── Reset Password ───────────────────────────────────────────
  resetPassword: {
    title: 'New Password',
    subtitle: 'Create a strong password to recover your access to {brand}.',
    invalidLink: 'This recovery link appears to be invalid or has expired.',
    backToHome: 'Back to Home',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Your strong new password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Repeat your password',
    submitButton: 'Reset Password',
    updating: 'Updating…',
    rememberedPassword: 'Remembered your password?',
    signIn: 'Sign in',
    validationMin: 'Password must be at least 8 characters',
    validationUppercase: 'Add at least one uppercase letter',
    validationNumber: 'Add at least one number',
    validationMatch: 'Passwords do not match',
  },

  // ─── Change Password ──────────────────────────────────────────
  changePassword: {
    title: 'New Password',
    subtitle: 'Set a strong password for your Anti-Tédio account.',
    newPasswordLabel: 'New Password',
    confirmPasswordLabel: 'Confirm Password',
    updateButton: 'Update Password',
    updating: 'Updating…',
    cancel: 'Cancel',
    validationMin: 'Password must be at least 8 characters',
    validationMatch: 'Passwords do not match',
  },

  // ─── Select Person ────────────────────────────────────────────
  selectPerson: {
    title: 'How would you describe yourself?',
    subtitle: 'Pick the traits that best match your vibe right now.',
    loading: 'Loading personality options',
    traitsLabel: 'Personality traits — select at least 3',
    counterNone: 'Select at least 3 traits to continue',
    counterSome: '{count} more to go…',
    counterReady: '✓ {count} selected — ready to continue!',
    continueButton: 'Continue',
    continueAriaLabel: 'Continue to category selection',
  },

  // ─── Select Category ──────────────────────────────────────────
  selectCategory: {
    back: 'BACK',
    title: 'What do you feel like doing?',
    subtitle: "Pick a category and we'll find the perfect suggestion for you.",
    selected: 'Selected',
    categoriesLabel: 'Content categories',
    continueButton: 'Continue',
    resultButton: 'Get Recommendation',
    continueAriaLabel: 'Continue to extra info',
    resultAriaLabel: 'Get my recommendation',
  },

  // ─── Edit Person ──────────────────────────────────────────────
  editPerson: {
    title: 'Select your personality traits',
    subtitle: 'Choose between 3 and 8 traits that describe you.',
    doneButton: 'Done',
    saveAriaLabel: 'Save selected traits and close',
    closeAriaLabel: 'Close and save traits',
    traitsLabel: 'Personality traits',
  },

  // ─── Info Person ──────────────────────────────────────────────
  infoPerson: {
    triggerLabel: 'More details about this trait',
    dialogTitle: 'About this trait',
    closeLabel: 'Close details',
  },

  // ─── Badge Person ─────────────────────────────────────────────
  badgePerson: {
    selected: '{trait} — selected, click to deselect',
    unselected: '{trait} — click to select',
  },

  // ─── Buy Credits ──────────────────────────────────────────────
  buyCredits: {
    triggerLabel: 'Buy more credits — view credit plans',
    dialogTitle: 'Power Up Your Anti-Tédio',
    dialogSubtitle: 'Choose a credit pack and unlock exclusive AI-powered recommendations.',
    credits: '{count} credits',
    mostPopular: 'Most popular plan',
    mostPopularBadge: 'Most Popular',
    buyNow: 'Buy Now',
    processing: 'Processing…',
    securityNote: '🔒 Secure payment · Credits available immediately after purchase',
    plansLabel: 'Credit plans',
  },

  // ─── Profile ──────────────────────────────────────────────────
  profile: {
    member: 'Member',
    myAccount: 'My Account',
    changePassword: 'Change Password',
    signOut: 'Sign Out',
    deleteAccount: 'Delete Account',
    editPhotoLabel: 'Edit profile photo',
    accountOptionsLabel: 'Account options',
    noTraitsTitle: 'No traits found',
    noTraitsSubtitle: "You haven't added any personality traits yet.",
    chooseTraits: 'Choose traits',
    historyTitle: 'Recommendation History',
    noHistoryTitle: 'No recommendations yet',
    noHistorySubtitle: "We haven't generated any recommendations for you yet.",
    exploreNow: 'Explore now',
    filterLabel: 'Filter by category',
    filterAll: 'All categories',
    noFilterResults: 'No results for this category',
    noFilterResultsSubtitle: 'Try selecting a different category or clear the filter.',
    clearFilter: 'Clear filter',
    loadingTraits: 'Loading traits',
    myPersonality: 'My Personality',
    editTraitsLabel: 'Edit personality traits',
    selectedTraitsLabel: 'Selected traits',
  },

  // ─── Edit Avatar ──────────────────────────────────────────────
  editAvatar: {
    dialogTitle: 'Profile Photo',
    previewLabel: 'Profile photo preview',
    newPhotoLabel: 'New photo selected',
    newBadge: 'NEW',
    dropzoneLabel: 'Click or drag an image to upload',
    dropzoneActive: 'Drop image here',
    dropzoneText: 'Click or drag an image here',
    dropzoneHint: 'JPEG, PNG or WebP · max 5MB',
    errorFormat: 'Invalid format. Please use JPEG, PNG, or WebP.',
    errorSize: 'Image too large. Maximum size is {max}MB.',
    discard: 'Discard',
    discardLabel: 'Discard selected photo',
    confirm: 'Confirm',
    confirmLabel: 'Confirm and upload photo',
    uploading: 'Uploading…',
    cancel: 'Cancel',
    cancelLabel: 'Cancel and close dialog',
  },

  // ─── History Card ─────────────────────────────────────────────
  historyCard: {
    uncategorized: 'Uncategorized',
    by: 'By {name}',
    showLess: 'Show less',
    readMore: 'Read more',
    recommendedOn: 'Recommended on {date}',
    score: 'Score',
    criticScore: 'Critic score: {score}',
    rating: 'Rating: {score} stars',
  },

  // ─── Result ───────────────────────────────────────────────────
  result: {
    articleLabel: 'Your personalized recommendation',
    tryDifferent: 'TRY SOMETHING DIFFERENT',
    tryDifferentLabel: 'Start over and discover a different activity',
    tryAgain: 'Try Again',
    tryAgainLabel: 'Get a new recommendation in the same category',
    actionsLabel: 'Result actions',
  },

  // ─── Midia ────────────────────────────────────────────────────
  midia: {
    synopsis: 'Synopsis',
    availableOn: 'Available on',
    showLess: 'Show less',
    readMore: 'Read more',
    loadingLabel: 'Loading recommendation',
  },

  // ─── Book ─────────────────────────────────────────────────────
  book: {
    by: 'by',
    publishedIn: 'Published in',
    synopsis: 'Synopsis',
    readSample: 'Read a Sample',
    readSampleLabel: 'Read a free sample of this book on Google Play Books',
    showLess: 'Show less',
    readMore: 'Read more',
  },

  // ─── Video Game ───────────────────────────────────────────────
  videoGame: {
    availableOn: 'Available on {store}',
    buyNow: 'Buy Now',
    buyNowLabel: 'Buy {title} on {store} for {price}',
    score: 'Score',
    criticScore: 'Critic score: {score}',
  },

  // ─── Loading ──────────────────────────────────────────────────
  loading: {
    title: 'Generating your recommendation',
    message1: 'Analyzing your preferences…',
    message2: 'Generating personalized suggestions…',
    message3: 'Almost there, refining your results…',
    progressLabel: 'Loading progress',
  },

  // ─── Delete Account ───────────────────────────────────────────
  deleteAccount: {
    title: 'Delete My Account',
    subtitle: "We're sorry to see you go. Before proceeding, please understand what will happen to your data.",
    creditsTitle: 'Credits Lost',
    creditsDesc: 'All purchased and unused credits will be permanently removed. There are no refunds for deleted accounts.',
    historyTitle: 'History & Preferences',
    historyDesc: 'Your personalized suggestions, activity history, and Anti-Tédio achievements will be erased.',
    dataTitle: 'Personal Data',
    dataDesc: 'Your profile information, integrations, and account settings will be permanently removed.',
    importantNote: "{strong} Your account won't be deleted immediately. It will be suspended for {days}. During this period, you can reactivate it via the link sent to your {email}. After 30 days, deletion is permanent and all data will be removed from our servers.",
    important: 'Important:',
    thirtyDays: '30 days',
    emailWord: 'email',
    whatYouLose: 'What you will lose',
    proceedButton: 'Proceed with Deletion',
    cancelButton: 'I changed my mind, keep my account',
    modalTitle: 'Final Confirmation',
    modalDesc: 'To confirm account deletion and acknowledge the 30-day suspension, type {word} below.',
    deleteWord: 'DELETE',
    deleteWordDisplay: '"DELETE"',
    confirmButton: 'Confirm Deletion',
    deleting: 'Deleting…',
    inputPlaceholder: 'Type here…',
    inputHint: 'Type the word DELETE in capital letters to enable the confirm button',
  },

  // ─── Payment Pages ────────────────────────────────────────────
  paymentSuccess: {
    title: 'Payment Confirmed!',
    subtitle: "Your transaction was completed successfully. Get ready — boredom's days are numbered!",
    startExploring: 'Start Exploring',
    startExploringLabel: 'Start exploring recommendations',
  },

  paymentFailure: {
    title: 'Something went wrong',
    subtitle: "Unfortunately, we couldn't process your payment. Boredom hasn't won yet — and neither should you give up!",
    reasonsTitle: 'Common reasons:',
    reason1: 'Insufficient balance or card limit reached.',
    reason2: 'Incorrect card details entered.',
    reason3: 'Transaction declined by the issuing bank.',
    noCharge: 'No charges were made to your card.',
    reasonsLabel: 'Common reasons for payment failure',
  },

  paymentPending: {
    title: 'Almost there!',
    subtitle: "We're waiting for your payment confirmation. Boredom is already packing its bags!",
    pixTitle: 'Pix Copy & Paste Code',
    pixCodeLabel: 'Pix code',
    pixCopyLabel: 'Copy Pix code to clipboard',
    pixNote: 'After payment, access to {brand} will be released instantly.',
    checkButton: 'I paid — check now',
    checkButtonLabel: 'I already paid — check payment status now',
    backButton: 'Back to home',
  },

  // ─── Account Recovery ─────────────────────────────────────────
  accountRecovery: {
    recoveringTitle: 'Recovering your account…',
    recoveringSubtitle: "We're bringing everything back. Boredom won't win today!",
    successTitle: 'Welcome back!',
    successSubtitle: 'Your account has been successfully reactivated. Your credits and history are safe and sound.',
    goToApp: 'Go to the App',
    errorTitle: 'Recovery not possible',
    errorSubtitle: "Unfortunately, the 30-day window has expired, the data has been permanently removed, or you've already completed recovery.",
    recoveringLabel: 'Recovering your account, please wait',
    successLabel: 'Account successfully recovered',
    errorLabel: 'Account recovery failed',
  },

  // ─── Extra Info (budget) ──────────────────────────────────────
  extraInfo: {
    title: "What's your budget?",
    subtitle: 'Enter the maximum amount you want to spend.',
    budgetLabel: 'Available Budget:',
    noLimit: 'No limit',
    budgetValue: 'R$ {value},00',
    submitButton: 'See Results',
    submitLabel: 'Confirm budget and see results',
  },

  // ─── Email Verification ───────────────────────────────────────
  emailVerification: {
    title: 'Check your email: {email}',
    description: 'Enter the 6-digit code sent to your email to unlock full access.',
    otpLabel: 'One-time verification code — 6 digits',
    verifying: 'Verifying…',
    confirmButton: 'Confirm',
    changeEmail: 'Change email',
    changeEmailLabel: 'Go back and use a different email address',
    genericError: 'Invalid or expired code. Please try again.',
  },

  // ─── Home ─────────────────────────────────────────────────────
  home: {
    badge: 'AI-powered leisure discovery',
    title: 'Your {boredom} ends here.',
    boredomWord: 'boredom',
    subtitle: '{brand} is your personal leisure assistant. We use AI to understand your mood and suggest the perfect activity for today.',
    ctaButton: 'Discover what to do',
    ctaLabel: 'Start discovering activities — powered by AI',
    featuresHeading: 'Why Anti-Tédio?',
    feature1Title: 'Instant Suggestions',
    feature1Desc: 'Get activity ideas in seconds — no more wasting time deciding what to do.',
    feature2Title: 'Fully Personalized',
    feature2Desc: 'Our AI learns your preferences to deliver increasingly accurate recommendations.',
    feature3Title: 'Activity History',
    feature3Desc: 'All your past recommendations are saved and easy to revisit anytime.',
  },

  // ─── Contact ──────────────────────────────────────────────────
  contact: {
    badge: 'Contact us',
    title: 'Get in ',
    titleHighlight: 'touch',
    subtitle: 'Have any questions, suggestions, or want to collaborate? Fill out the form and we will get back to you as soon as possible.',
    emailLabel: 'E-mail',
    hoursLabel: 'Response time',
    hoursValue: 'Mon – Fri, 9 AM to 6 PM',
    locationLabel: 'Location',
    locationValue: 'São Paulo, Brazil',
    successTitle: 'Message sent!',
    sendAnother: 'Send another message',
    errorTitle: 'Error sending',
    tryAgain: 'Try again',
    formName: 'Name',
    formNamePlaceholder: 'Your name',
    formEmail: 'E-mail',
    formEmailPlaceholder: 'you@example.com',
    formSubject: 'Subject',
    formSubjectPlaceholder: 'What is it about?',
    formMessage: 'Message',
    formMessagePlaceholder: 'Write your message here...',
    requiredFields: 'Fields with * are required',
    sendButton: 'Send message',
    sending: 'Sending…',
    validationName: 'Name must be at least 2 characters',
    validationEmail: 'Invalid e-mail',
    validationSubject: 'Subject must be at least 3 characters',
    validationMessage: 'Message must be at least 10 characters',
    genericError: 'Failed to send the message.',
  },

  // ─── Privacy Policy ───────────────────────────────────────────
  privacy: {
    pageTitle: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    intro: 'Your privacy matters to us. This policy explains how Anti-Tédio collects, uses and protects your personal data.',
    contactQuestion: 'Questions about privacy?',
    contactPrompt: 'Get in touch:',
    sections: [
      {
        title: '1. What data we collect',
        content: `We collect only the data necessary to provide the best recommendation experience:\n\n• **Account data:** name, email address and password (stored as a secure hash) provided at sign-up, or profile information obtained via OAuth (Google/Facebook).\n• **Personality preferences:** the traits you select to receive personalised suggestions.\n• **Recommendation history:** suggested titles and whether you liked them, to improve future suggestions.\n• **Payment data:** processed exclusively by Stripe (international payments) and Mercado Pago (Brazil). Anti-Tédio never stores card data.\n• **Technical data:** IP address, browser type and access logs collected automatically for security and diagnostics.`,
      },
      {
        title: '2. How we use your data',
        content: `Your data is used exclusively to:\n\n• Generate personalised recommendations for films, series, anime, books and games through artificial intelligence (Google Gemini Pro).\n• Keep your account active and secure via JWT and OAuth 2.0.\n• Process credit payments securely.\n• Send transactional emails (account confirmation, password reset, account recovery) via the Resend platform.\n• Translate content into the user's preferred language via Google Cloud Translation.\n• Continuously improve the product based on aggregated and anonymised data.`,
      },
      {
        title: '3. Data sharing',
        content: `Anti-Tédio does not sell your data. We share information only with partners essential to the operation of the service:\n\n• **Google (Gemini Pro, Books API, Cloud Translation, OAuth)** — for generating suggestions, book metadata, translation and authentication.\n• **Stripe and Mercado Pago** — for payment processing.\n• **OMDB API** — for film and series metadata.\n• **IsThereAnyDeal API** — for game prices and deals.\n• **Resend** — for sending transactional emails.\n• **Meta (Facebook OAuth)** — optional, only if you choose to sign in with Facebook.`,
      },
      {
        title: '4. Storage and security',
        content: `• Persistent data is stored in a MySQL database managed with Prisma ORM.\n• Sessions and temporary cache use Redis/Valkey with automatic expiry.\n• Passwords are stored exclusively as a secure hash — never in plain text.\n• Access tokens (JWT) have a short lifespan and are renewed by refresh tokens.\n• All communication between client and server occurs via HTTPS/TLS.`,
      },
      {
        title: '5. Your rights (LGPD / GDPR)',
        content: `You have the following rights over your personal data:\n\n• **Access:** request a copy of the data we hold about you.\n• **Correction:** update incorrect or outdated information.\n• **Deletion:** delete your account and all associated data — available directly in profile settings. After the request, data is removed within 30 days.\n• **Portability:** receive your data in a structured format.\n• **Withdrawal of consent:** withdraw consent for the use of your data at any time.\n\nTo exercise any of these rights, contact us: contato@mail.antitedio.com.br`,
      },
      {
        title: '6. Cookies and tracking',
        content: `We use cookies and similar technologies to:\n\n• Keep your session authenticated.\n• Remember language preferences and settings.\n• Display relevant advertisements via Google AdSense (third-party cookies managed by Google).\n\nYou can manage or disable cookies in your browser settings.`,
      },
      {
        title: '7. Minors',
        content: `Anti-Tédio is intended for users aged 13 and over. We do not intentionally collect data from children under 13. If we become aware that we have collected data from a child without verifiable parental consent, we will delete that information immediately.\n\nLegal guardians may contact us at contato@mail.antitedio.com.br to request the deletion of a minor's data.`,
      },
      {
        title: '8. Changes to this policy',
        content: `We may update this Privacy Policy periodically. When we make significant changes, we will notify you by email or via a prominent notice on the platform before the changes take effect.\n\nContinued use of the service after changes constitutes acceptance of the new policy.`,
      },
    ],
  },

  // ─── Terms of Use ─────────────────────────────────────────────
  terms: {
    pageTitle: 'Terms of Use',
    lastUpdated: 'Last updated: March 2026',
    intro: 'Please read these terms carefully before using Anti-Tédio. By using the platform, you agree to the conditions below.',
    contactQuestion: 'Questions about the terms?',
    viewPrivacy: '→ View Privacy Policy',
    sections: [
      {
        title: '1. Acceptance of terms',
        content: `By accessing or using Anti-Tédio, you agree to these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, do not use the service.\n\nThese terms apply to all users, including visitors, registered users and anyone who accesses the content made available by the platform.`,
      },
      {
        title: '2. Description of service',
        content: `Anti-Tédio is an entertainment recommendation platform that uses artificial intelligence (Google Gemini Pro) to suggest films, series, anime, cartoons, books and games based on the user's personality profile and preferences.\n\nThe service includes:\n• Personalised recommendations using credits.\n• History of received suggestions.\n• Game price information via IsThereAnyDeal.\n• Media metadata via OMDB API and Google Books API.\n• Automatic content translation via Google Cloud Translation.`,
      },
      {
        title: '3. Registration and account',
        content: `To use the full features of Anti-Tédio, you need to create an account. By registering, you agree to:\n\n• Provide truthful, accurate and up-to-date information.\n• Keep your password confidential and not share it with third parties.\n• Immediately notify Anti-Tédio of any unauthorised use of your account at contato@mail.antitedio.com.br.\n• Be responsible for all activities carried out under your account.`,
      },
      {
        title: '4. Credits and payments',
        content: `Anti-Tédio operates with a credit system for generating recommendations:\n\n• Each AI-generated recommendation consumes one credit from your account.\n• Credits can be purchased via Stripe (international card payments) or Mercado Pago (Brazil, including Pix).\n• Credits have no expiry date and are non-transferable between accounts.\n• **Refund policy:** unused credits can be refunded within 7 calendar days of purchase. Partially used credits are not eligible for refund.\n• Prices are subject to change with 15 days' prior notice by email.`,
      },
      {
        title: '5. Acceptable use',
        content: `You agree not to use Anti-Tédio to:\n\n• Violate any applicable law or regulation.\n• Reverse-engineer, decompile or attempt to extract the source code of the platform.\n• Use bots, scripts or any automated means to access the service without express authorisation.\n• Carry out denial-of-service attacks (DoS/DDoS) or deliberately overload the infrastructure.\n• Attempt to bypass authentication or security mechanisms.\n• Collect data from other users without consent.`,
      },
      {
        title: '6. Intellectual property',
        content: `All original content of Anti-Tédio — including logo, design, texts, source code and visual identity — is protected by copyright and belongs to the Anti-Tédio team, licensed under MIT as per the public repository.\n\nAI-generated recommendations are based on data from third-party APIs (OMDB, Google Books, IsThereAnyDeal) that have their own terms of use. Anti-Tédio does not claim ownership over covers, synopses or metadata of third-party works displayed on the platform.`,
      },
      {
        title: '7. Limitation of liability',
        content: `Anti-Tédio is provided "as is" and "as available", without warranties of any kind, express or implied.\n\nWe do not guarantee that:\n• Recommendations will meet all personal tastes or expectations.\n• The service will always be available without interruptions or errors.\n• Game price information (via IsThereAnyDeal) is accurate at the time of purchase.`,
      },
      {
        title: '8. Account termination and deletion',
        content: `You can close your account at any time in the profile settings. When requesting deletion:\n\n• Your personal data and history are removed within 30 days.\n• Remaining credits may be refunded according to the refund policy (section 4).\n• After 30 days, deletion is irreversible.\n\nAnti-Tédio may suspend or close your account without prior notice in the event of a serious violation of these terms, fraudulent activity or by legal order.`,
      },
      {
        title: '9. Applicable law',
        content: `These terms are governed by the laws of the Federative Republic of Brazil, including the General Data Protection Law (LGPD — Law No. 13,709/2018) and the Consumer Protection Code (Law No. 8,078/1990).\n\nFor users outside Brazil, additional local laws may apply, including GDPR for European Union users.\n\nAny dispute arising from these terms will preferably be resolved through mediation. If not possible, the courts of São Paulo/SP, Brazil, shall have jurisdiction.`,
      },
      {
        title: '10. Changes to terms',
        content: `We reserve the right to modify these Terms of Use at any time. Significant changes will be communicated at least 15 days in advance by email or via a notice on the platform.\n\nContinued use of the service after the changes take effect constitutes acceptance of the new terms.`,
      },
    ],
  },

  // ─── Credits / Third-party ────────────────────────────────────
  credits: {
    pageTitle: 'Credits & Technologies',
    lastUpdated: 'Last updated: March 2026',
    intro: 'Anti-Tédio is built with cutting-edge technologies and high-quality external APIs. Here we acknowledge all the third-party services and resources that make this platform possible.',
    backendTitle: 'Back-end & Infrastructure',
    frontendTitle: 'Front-end & Interface',
    apisTitle: 'APIs & External Services',
    assetsTitle: 'Visual Assets & Fonts',
    teamTitle: 'About the Creator',
    teamIntro: 'Anti-Tédio was envisioned, designed and built by a single person passionate about technology and entertainment.',
    visitProfile: 'View profile',
    openSource: 'Open Source',
    openSourceDesc: 'The Anti-Tédio back-end is open source and available on GitHub under the MIT license.',
    viewRepo: 'View repository',
    contactTitle: 'Get in touch with the creator',
    contactDesc: 'Have an idea, want to collaborate, or just say hi? Pick your preferred channel.',
  },
}