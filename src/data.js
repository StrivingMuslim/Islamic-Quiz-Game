export const QUESTION_CATEGORIES = [
  { id: 'quran', name: 'Quran', color: 'bg-emerald-500', icon: '📖' },
  { id: 'hadith', name: 'Hadith', color: 'bg-amber-500', icon: '🎯' },
  { id: 'seerah', name: 'Seerah', color: 'bg-blue-500', icon: '👑' },
  { id: 'fiqh', name: 'Fiqh', color: 'bg-purple-500', icon: '🏆' },
  { id: 'history', name: 'Islamic History', color: 'bg-rose-500', icon: '⏰' },
  { id: 'general', name: 'General Knowledge', color: 'bg-indigo-500', icon: '🏅' }
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Easy', xp: 10, time: 15, color: 'bg-green-500', questions: 5 },
  { id: 'medium', name: 'Medium', xp: 20, time: 12, color: 'bg-amber-500', questions: 5 },
  { id: 'hard', name: 'Hard', xp: 30, time: 10, color: 'bg-red-500', questions: 5 }
];

export const MOCK_QUESTIONS = {
  quran: {
    easy: [
      { id: 1, question: "Who is the first prophet mentioned in the Qur'an?", options: ["Adam", "Noah", "Abraham"], answer: "Adam", explanation: "Prophet Adam (peace be upon him) is the first prophet and the first human being created by Allah." },
      { id: 2, question: "How many surahs are there in the Quran?", options: ["114", "6666", "112"], answer: "114", explanation: "The Qur'an has 114 chapters, known as Surahs." },
      { id: 3, question: "What is the longest surah in the Qur'an?", options: ["Al-Fatiha", "Al-Baqarah", "An-Nisa"], answer: "Al-Baqarah", explanation: "Surah Al-Baqarah, the second chapter of the Qur'an, is the longest." },
      { id: 4, question: "In what language was the Qur'an revealed?", options: ["Arabic", "Hebrew", "English"], answer: "Arabic", explanation: "The Qur'an was revealed in the Arabic language." },
      { id: 5, question: "Which prophet is mentioned most in the Qur'an?", options: ["Prophet Muhammad", "Prophet Musa", "Prophet Ibrahim"], answer: "Prophet Musa", explanation: "Prophet Musa (Moses) is mentioned the most frequently in the Qur'an." },
    ],
    medium: [
      { id: 6, question: "What is the name of the cave where Prophet Muhammad (PBUH) received the first revelation?", options: ["Cave of Hira", "Cave of Thawr", "Cave of Arafat"], answer: "Cave of Hira", explanation: "The Prophet Muhammad (peace be upon him) received the first revelation in the Cave of Hira, on Mount Jabal al-Nour." },
      { id: 7, question: "How many times is the name 'Muhammad' mentioned in the Qur'an?", options: ["1", "4", "7"], answer: "4", explanation: "The name of Prophet Muhammad (peace be upon him) is explicitly mentioned four times in the Qur'an." },
      { id: 8, question: "Which surah does not start with Bismillahir Rahmanir Raheem?", options: ["Al-Fatiha", "At-Tawbah", "Al-Ikhlas"], answer: "At-Tawbah", explanation: "Surah At-Tawbah, the ninth chapter of the Qur'an, is the only one that does not begin with the Bismillah." },
      { id: 9, question: "What is the only surah named after a woman?", options: ["Surah Maryam", "Surah Al-Fatiha", "Surah At-Tawbah"], answer: "Surah Maryam", explanation: "Surah Maryam is named after Mary, the mother of Prophet Isa (Jesus), peace be upon him." },
      { id: 10, question: "Which animal is mentioned in the Qur'an as having spoken to a prophet?", options: ["A dog", "An ant", "A hoopoe bird"], answer: "An ant", explanation: "An ant spoke to Prophet Sulaiman (Solomon), peace be upon him, as mentioned in Surah An-Naml." },
    ],
    hard: [
      { id: 11, question: "Which prophet's story is known as 'the best of stories' in the Qur'an?", options: ["Prophet Yusuf", "Prophet Adam", "Prophet Yunus"], answer: "Prophet Yusuf", explanation: "The story of Prophet Yusuf (Joseph) is called 'Ahsan al-Qasas' (the best of stories) in the Qur'an." },
      { id: 12, question: "What is the name of the angel in charge of the trumpet on the Day of Judgment?", options: ["Jibril", "Mika'il", "Israfil"], answer: "Israfil", explanation: "Angel Israfil is the one who will blow the trumpet to signal the Day of Judgment." },
      { id: 13, question: "The word 'Quran' means:", options: ["The Book", "The Recitation", "The Guidance"], answer: "The Recitation", explanation: "The word 'Qur'an' literally means 'the recitation' or 'that which is recited'." },
      { id: 14, question: "How many prophets are mentioned by name in the Qur'an?", options: ["25", "114", "313"], answer: "25", explanation: "There are 25 prophets mentioned by name in the Qur'an." },
      { id: 15, question: "What is the significance of the first five verses of Surah Al-Alaq?", options: ["They are the last verses revealed", "They contain the rules of Hajj", "They were the first verses of the Qur'an to be revealed"], answer: "They were the first verses of the Qur'an to be revealed", explanation: "The first five verses of Surah Al-Alaq were the very first verses revealed to Prophet Muhammad (peace be upon him)." },
    ],
  },
  hadith: {
    easy: [
      { id: 16, question: "What is the first pillar of Islam?", options: ["Salat (Prayer)", "Shahada (Declaration of Faith)", "Zakat (Charity)"], answer: "Shahada (Declaration of Faith)", explanation: "The Shahada, the declaration of faith, is the first and most important pillar of Islam." },
      { id: 17, question: "How many daily obligatory prayers (Salat) are there in Islam?", options: ["3", "5", "7"], answer: "5", explanation: "Muslims are required to perform five daily obligatory prayers." },
      { id: 18, question: "What is the reward for a person who fasts in Ramadan out of faith and hope of reward?", options: ["All their previous sins will be forgiven", "They will be granted a palace in Jannah", "They will receive immense wealth"], answer: "All their previous sins will be forgiven", explanation: "As per a Hadith, 'Whoever fasts Ramadan out of faith and hope of reward, all his previous sins will be forgiven.'" },
      { id: 19, question: "What does the Hadith 'Actions are by intentions' mean?", options: ["You must have good intentions to get rewards", "You should always announce your intentions", "Intentions are not important"], answer: "You must have good intentions to get rewards", explanation: "This Hadith emphasizes that the sincerity of our intentions determines the reward for our actions." },
      { id: 20, question: "What is the name of the final prophet in Islam?", options: ["Prophet Isa", "Prophet Musa", "Prophet Muhammad"], answer: "Prophet Muhammad", explanation: "Prophet Muhammad (peace be upon him) is the last and final prophet in Islam." },
    ],
    medium: [
      { id: 21, question: "Who compiled the most authentic collection of Hadith, Sahih al-Bukhari?", options: ["Imam Muslim", "Imam Bukhari", "Imam Malik"], answer: "Imam Bukhari", explanation: "Sahih al-Bukhari is one of the six major canonical Hadith collections, compiled by Imam Muhammad al-Bukhari." },
      { id: 22, question: "What is the significance of the 'Forty Hadith of Imam Nawawi'?", options: ["It is a collection of 40 short Hadith covering key principles of Islam", "It is the first Hadith book ever written", "It contains only Hadith on prayer"], answer: "It is a collection of 40 short Hadith covering key principles of Islam", explanation: "The Forty Hadith of Imam Nawawi is a famous collection of 42 (not exactly 40) Hadith that are considered to be core principles of Islam." },
      { id: 23, question: "What is the Sunnah?", options: ["The Qur'an", "The sayings, actions, and approvals of Prophet Muhammad (PBUH)", "The laws of the land"], answer: "The sayings, actions, and approvals of Prophet Muhammad (PBUH)", explanation: "The Sunnah refers to the way of life prescribed as a model for Muslims, based on the teachings and practices of Prophet Muhammad (peace be upon him)." },
      { id: 24, question: "Which Hadith collection is considered second in authenticity to Sahih al-Bukhari?", options: ["Sunan Abu Dawud", "Sahih Muslim", "Jami' at-Tirmidhi"], answer: "Sahih Muslim", explanation: "Sahih Muslim is widely regarded as the second most authentic Hadith collection after Sahih al-Bukhari." },
      { id: 25, question: "What does the Hadith 'He is not a believer who eats his fill while his neighbor is hungry' emphasize?", options: ["The importance of sharing food", "The importance of charity and community responsibility", "The importance of eating well"], answer: "The importance of charity and community responsibility", explanation: "This Hadith, narrated by Ibn 'Abbas, highlights the importance of caring for your neighbors and the community." },
    ],
    hard: [
      { id: 26, question: "What is the name of the book compiled by Imam Malik, which is the earliest collection of Hadith?", options: ["Sahih al-Bukhari", "Al-Muwatta", "Sunan Ibn Majah"], answer: "Al-Muwatta", explanation: "Al-Muwatta is one of the earliest written collections of Hadith, compiled by Imam Malik ibn Anas." },
      { id: 27, question: "In the Hadith 'The world is a prison for the believer and a paradise for the disbeliever,' what does 'prison' refer to?", options: ["Physical confinement", "Restrictions from sinful desires", "A place of punishment"], answer: "Restrictions from sinful desires", explanation: "This Hadith means that believers restrict themselves from worldly pleasures and desires that are not permitted in Islam." },
      { id: 28, question: "What are the six major Hadith collections known as?", options: ["The Six Pillars", "The Kutub al-Sittah", "The Six Gospels"], answer: "The Kutub al-Sittah", explanation: "The six major canonical Hadith collections are collectively known as Al-Kutub al-Sittah." },
      { id: 29, question: "What is the name of the final book of Hadith in the Kutub al-Sittah?", options: ["Sunan Ibn Majah", "Sunan Abu Dawud", "Sunan an-Nasa'i"], answer: "Sunan Ibn Majah", explanation: "Sunan Ibn Majah is the sixth and final book in the Kutub al-Sittah." },
      { id: 30, question: "What is a 'Hadith Qudsi'?", options: ["A Hadith from the Prophet's companions", "A Hadith in which the Prophet narrates from Allah (SWT)", "A Hadith about the future"], answer: "A Hadith in which the Prophet narrates from Allah (SWT)", explanation: "A Hadith Qudsi is a saying of the Prophet (PBUH) in which he directly quotes Allah (SWT), but it is not part of the Qur'an." },
    ],
  },
  seerah: {
    easy: [
      { id: 31, question: "In which city was Prophet Muhammad (PBUH) born?", options: ["Madinah", "Mecca", "Jerusalem"], answer: "Mecca", explanation: "The Prophet Muhammad (peace be upon him) was born in the city of Mecca in the year 570 CE." },
      { id: 32, question: "What was the name of the Prophet Muhammad's mother?", options: ["Aisha", "Khadijah", "Amina"], answer: "Amina", explanation: "The Prophet's mother's name was Aminah bint Wahb." },
      { id: 33, question: "Who was the first person to believe in Prophet Muhammad (PBUH) and become a Muslim?", options: ["Abu Bakr", "Khadijah", "Ali"], answer: "Khadijah", explanation: "Khadijah bint Khuwaylid, the Prophet's first wife, was the first person to accept Islam." },
      { id: 34, question: "What was the name of the Prophet's first wife?", options: ["Aisha", "Fatima", "Khadijah"], answer: "Khadijah", explanation: "The Prophet's first and most beloved wife was Khadijah bint Khuwaylid." },
      { id: 35, question: "What year did the Prophet (PBUH) and his companions migrate to Madinah (The Hijrah)?", options: ["610 CE", "622 CE", "632 CE"], answer: "622 CE", explanation: "The Hijrah, the migration of the Prophet from Mecca to Medina, took place in the year 622 CE." },
    ],
    medium: [
      { id: 36, question: "What was the name of the first battle fought between the Muslims and the Quraysh?", options: ["Battle of Uhud", "Battle of Badr", "Battle of the Trench"], answer: "Battle of Badr", explanation: "The Battle of Badr was the first major battle between the early Muslims and the Meccan polytheists in the year 624 CE." },
      { id: 37, question: "Who was known as 'As-Siddiq' (The Truthful) among the companions of the Prophet (PBUH)?", options: ["Ali ibn Abi Talib", "Umar ibn al-Khattab", "Abu Bakr al-Siddiq"], answer: "Abu Bakr al-Siddiq", explanation: "Abu Bakr was given the title 'As-Siddiq' due to his unwavering belief and support for the Prophet." },
      { id: 38, question: "What was the name of the Prophet's camel he rode during the Hijrah?", options: ["Al-Qaswa", "Al-Burraq", "Al-Adba"], answer: "Al-Qaswa", explanation: "The Prophet's camel was named Al-Qaswa." },
      { id: 39, question: "What was the name of the treaty signed between the Muslims of Madinah and the people of Mecca?", options: ["Treaty of Hudaybiyyah", "Treaty of Makkah", "Treaty of Uhud"], answer: "Treaty of Hudaybiyyah", explanation: "The Treaty of Hudaybiyyah was a peace treaty signed in 628 CE." },
      { id: 40, question: "What was the name of the Prophet's youngest daughter?", options: ["Zaynab", "Ruqayyah", "Fatima"], answer: "Fatima", explanation: "Fatima was the youngest and most beloved daughter of the Prophet Muhammad (PBUH)." },
    ],
    hard: [
      { id: 41, question: "How many major battles did the Prophet Muhammad (PBUH) lead in his lifetime?", options: ["27", "70", "150"], answer: "27", explanation: "The Prophet Muhammad (peace be upon him) led 27 major military expeditions in his life." },
      { id: 42, question: "Who was the last of the four Rightly Guided Caliphs?", options: ["Abu Bakr", "Umar", "Ali"], answer: "Ali", explanation: "The fourth and last of the Rightly Guided Caliphs was Ali ibn Abi Talib." },
      { id: 43, question: "What was the name of the Prophet's trusted companion who was with him in the Cave of Thawr?", options: ["Umar", "Abu Bakr", "Ali"], answer: "Abu Bakr", explanation: "Abu Bakr was with the Prophet (peace be upon him) in the Cave of Thawr during the Hijrah." },
      { id: 44, question: "What was the name of the Prophet's paternal uncle who was a fierce opponent of Islam before converting?", options: ["Abu Talib", "Hamza", "Abu Lahab"], answer: "Hamza", explanation: "Hamza ibn Abd al-Muttalib, the Prophet's uncle, was a respected fighter who initially opposed Islam but later became one of its staunchest defenders." },
      { id: 45, question: "What was the name of the Prophet's sword?", options: ["Zulfiqar", "Al-Ma'thur", "Dhu al-Faqar"], answer: "Al-Ma'thur", explanation: "The name of the Prophet's sword was Al-Ma'thur." },
    ],
  },
  fiqh: {
    easy: [
      { id: 46, question: "What is the name of the ritual purification performed with water?", options: ["Tayammum", "Wudu", "Ghusl"], answer: "Wudu", explanation: "Wudu is the ritual washing performed to prepare for prayer." },
      { id: 47, question: "What is the name of the Islamic code of law?", options: ["Sunnah", "Sharia", "Fiqh"], answer: "Sharia", explanation: "Sharia is the body of Islamic law derived from the Qur'an and Sunnah." },
      { id: 48, question: "How many times a day are Muslims required to pray?", options: ["3", "5", "7"], answer: "5", explanation: "There are five obligatory prayers in Islam: Fajr, Dhuhr, Asr, Maghrib, and Isha." },
      { id: 49, question: "What is Zakat?", options: ["Pilgrimage to Mecca", "Fasting during Ramadan", "Compulsory charity"], answer: "Compulsory charity", explanation: "Zakat is a compulsory charity or tax paid by Muslims who meet the necessary criteria of wealth." },
      { id: 50, question: "What is the first month of the Islamic calendar?", options: ["Ramadan", "Muharram", "Rajab"], answer: "Muharram", explanation: "Muharram is the first month of the Islamic calendar, a time of new beginnings." },
    ],
    medium: [
      { id: 51, question: "What is the meaning of 'Halal'?", options: ["Forbidden", "Permissible", "Discouraged"], answer: "Permissible", explanation: "Halal refers to anything that is permissible or lawful in Islam." },
      { id: 52, question: "What is the maximum number of times a day a Muslim can perform Tayammum?", options: ["3", "1", "There is no limit"], answer: "There is no limit", explanation: "There is no limit on the number of times a person can perform Tayammum if they are unable to find water." },
      { id: 53, question: "What is the name of the minor pilgrimage that can be performed at any time of the year?", options: ["Hajj", "Umrah", "Jihad"], answer: "Umrah", explanation: "Umrah is the 'minor' pilgrimage to Mecca that can be performed at any time, unlike Hajj." },
      { id: 54, question: "What is the name of the Friday congregational prayer?", options: ["Salat al-Fajr", "Salat al-Jumu'ah", "Salat al-Eid"], answer: "Salat al-Jumu'ah", explanation: "Salat al-Jumu'ah is the mandatory congregational prayer held on Fridays." },
      { id: 55, question: "What is the term for a scholarly ruling on a matter of Islamic law?", options: ["Hadith", "Fatwa", "Ijma'"], answer: "Fatwa", explanation: "A fatwa is a non-binding legal opinion or ruling concerning a point of Islamic law." },
    ],
    hard: [
      { id: 56, question: "What is the name of the ritual performed with dust or clean earth when water is not available for purification?", options: ["Wudu", "Ghusl", "Tayammum"], answer: "Tayammum", explanation: "Tayammum is the ritual of purification with dust when water is scarce or one is unable to use it." },
      { id: 57, question: "What is the term for the consensus of Islamic scholars on a matter of religious law?", options: ["Ijma'", "Qiyas", "Ijtihad"], answer: "Ijma'", explanation: "Ijma' (consensus) is a source of Islamic law, alongside the Qur'an and Sunnah." },
      { id: 58, question: "What is the penalty for intentionally breaking a fast during Ramadan without a valid reason?", options: ["Fasting 60 consecutive days", "Paying a fine", "Asking for forgiveness"], answer: "Fasting 60 consecutive days", explanation: "The kaffarah for intentionally breaking a fast is to fast 60 consecutive days or feed 60 needy people." },
      { id: 59, question: "What is the name of the two-unit optional prayer performed after the Isha prayer?", options: ["Witr", "Tahajjud", "Tarawih"], answer: "Witr", explanation: "Witr prayer is an optional prayer of an odd number of rak'ahs performed after the Isha prayer." },
      { id: 60, question: "What is the term for the jurisprudential methodology used to deduce a legal ruling?", options: ["Fatwa", "Ijtihad", "Fiqh"], answer: "Ijtihad", explanation: "Ijtihad refers to the independent reasoning of a qualified scholar to determine a legal ruling." },
    ],
  },
  history: {
    easy: [
      { id: 61, question: "Who was the first Caliph of Islam?", options: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq"], answer: "Abu Bakr al-Siddiq", explanation: "Abu Bakr was the first Caliph, succeeding Prophet Muhammad (peace be upon him) in 632 CE." },
      { id: 62, question: "What was the name of the city that served as the capital of the Umayyad Caliphate?", options: ["Baghdad", "Damascus", "Cordoba"], answer: "Damascus", explanation: "Damascus, in modern-day Syria, was the capital of the Umayyad Caliphate." },
      { id: 63, question: "What year did the Ottoman Empire end?", options: ["1453", "1924", "1800"], answer: "1924", explanation: "The Ottoman Empire was formally dissolved in 1924, and its last sultan was exiled." },
      { id: 64, question: "What was the name of the famous Muslim explorer who traveled extensively and is known for his detailed travelogues?", options: ["Ibn Battuta", "Al-Khwarizmi", "Ibn Sina"], answer: "Ibn Battuta", explanation: "Ibn Battuta was a Moroccan explorer who traveled more than any other explorer in pre-modern history." },
      { id: 65, question: "What was the name of the city in Spain that was a center of Islamic learning and culture?", options: ["Madrid", "Granada", "Cordoba"], answer: "Cordoba", explanation: "Cordoba was a major Islamic cultural, political, and financial center during the Islamic rule of Spain." },
    ],
    medium: [
      { id: 66, question: "In which battle did Khalid ibn al-Walid earn the title 'Sword of Allah'?", options: ["Battle of Uhud", "Battle of Mu'tah", "Battle of Badr"], answer: "Battle of Mu'tah", explanation: "During the Battle of Mu'tah, Khalid ibn al-Walid saved the Muslim army from defeat, earning him the title 'Sayfullah' (Sword of Allah) from Prophet Muhammad (PBUH)." },
      { id: 67, question: "What was the name of the Muslim general who conquered Spain?", options: ["Tariq ibn Ziyad", "Umar ibn al-Khattab", "Saladin"], answer: "Tariq ibn Ziyad", explanation: "Tariq ibn Ziyad led the Islamic conquest of Visigothic Hispania (modern-day Spain) in 711 CE." },
      { id: 68, question: "Who was the founder of the Abbasid Caliphate?", options: ["Abu al-Abbas al-Saffah", "Harun al-Rashid", "Salah al-Din"], answer: "Abu al-Abbas al-Saffah", explanation: "Abu al-Abbas al-Saffah founded the Abbasid Caliphate in 750 CE." },
      { id: 69, question: "What was the name of the library in Baghdad that was a major intellectual center during the Islamic Golden Age?", options: ["House of Wisdom", "House of Knowledge", "Baghdad Library"], answer: "House of Wisdom", explanation: "The House of Wisdom (Bayt al-Hikma) was a major library and translation institute in Baghdad." },
      { id: 70, question: "Who was the famous Muslim female scientist known for her contributions to astronomy and mathematics?", options: ["Fatima al-Fihri", "Mariam al-Asturlabi", "Laila al-Ghaffari"], answer: "Mariam al-Asturlabi", explanation: "Mariam al-Asturlabi was a 10th-century Syrian scientist who specialized in the astrolabe." },
    ],
    hard: [
      { id: 71, question: "In what year did the Mongols sack Baghdad, ending the Abbasid Caliphate?", options: ["1258", "1453", "1099"], answer: "1258", explanation: "The Siege of Baghdad in 1258 by the Mongol Empire ended the golden age of the Islamic world." },
      { id: 72, question: "What was the name of the Muslim naval commander who led the Ottoman fleet in the Battle of Preveza?", options: ["Hayreddin Barbarossa", "Piri Reis", "Suleiman the Magnificent"], answer: "Hayreddin Barbarossa", explanation: "Hayreddin Barbarossa was an Ottoman admiral who led the Ottoman fleet to victory at the Battle of Preveza in 1538." },
      { id: 73, question: "What was the name of the treaty that formally ended the First Crusade with the creation of the Crusader states?", options: ["Treaty of Versailles", "Treaty of Ratisbon", "Treaty of Jaffa"], answer: "Treaty of Jaffa", explanation: "The Treaty of Jaffa in 1192 ended the Third Crusade, but the Crusader states were created in the First Crusade's aftermath." },
      { id: 74, question: "Who was the founder of the Mughal Empire in the Indian subcontinent?", options: ["Akbar", "Babur", "Shah Jahan"], answer: "Babur", explanation: "Babur was a Turco-Mongol prince who founded the Mughal Empire in 1526." },
      { id: 75, question: "What was the name of the famous Muslim physician and philosopher known in the West as Avicenna?", options: ["Al-Razi", "Ibn Sina", "Ibn Rushd"], answer: "Ibn Sina", explanation: "Ibn Sina, known as Avicenna, was a Persian polymath who is considered one of the most significant physicians and philosophers of the Islamic Golden Age." },
    ],
  },
  general: {
    easy: [
      { id: 76, question: "What is the Arabic term for 'peace be upon him'?", options: ["Insha'Allah", "Jazakallah", "Sallallahu alayhi wa sallam"], answer: "Sallallahu alayhi wa sallam", explanation: "Sallallahu alayhi wa sallam is an Islamic phrase used to show respect for Prophet Muhammad." },
      { id: 77, question: "What is the name of the angel who delivers revelations?", options: ["Jibril", "Mika'il", "Israfil"], answer: "Jibril", explanation: "Angel Jibril (Gabriel) is known as the angel of revelation." },
      { id: 78, question: "What is the name of the first month of the Islamic calendar?", options: ["Ramadan", "Muharram", "Shawal"], answer: "Muharram", explanation: "Muharram is the first month of the Islamic calendar, a time of new beginnings." },
      { id: 79, question: "In Islam, what is the name of the pilgrimage to Mecca?", options: ["Umrah", "Hajj", "Jihad"], answer: "Hajj", explanation: "Hajj is the annual Islamic pilgrimage to Mecca and a mandatory religious duty for Muslims." },
      { id: 80, question: "Which direction do Muslims face when they pray?", options: ["East", "West", "Qibla"], answer: "Qibla", explanation: "Muslims face the direction of the Kaaba in Mecca, which is known as the Qibla." },
    ],
    medium: [
      { id: 81, question: "What is the name of the spiritual practice of seclusion and devotion, usually during the last ten days of Ramadan?", options: ["Zakat", "I'tikaf", "Tarawih"], answer: "I'tikaf", explanation: "I'tikaf is the practice of secluding oneself in a mosque for a period of time for the purpose of devotion." },
      { id: 82, question: "What is the Arabic term for 'greetings'?", options: ["Wa alaykumu as-salam", "Salam alaykum", "Alhamdulillah"], answer: "Salam alaykum", explanation: "As-salamu alaykum means 'Peace be upon you,' a standard Islamic greeting." },
      { id: 83, question: "What does the phrase 'Masha'Allah' mean?", options: ["God wills it", "God is great", "Praise be to God"], answer: "God wills it", explanation: "Masha'Allah is used to express appreciation, joy, or thankfulness for an event or person." },
      { id: 84, question: "What is the name of the ritual prayer performed in a group?", options: ["Salat", "Jumu'ah", "Jama'ah"], answer: "Jama'ah", explanation: "Jama'ah refers to the congregational prayer." },
      { id: 85, question: "What is the Arabic term for a 'mosque'?", options: ["Minaret", "Madrasa", "Masjid"], answer: "Masjid", explanation: "Masjid is the Arabic word for a mosque, a place of worship for Muslims." },
    ],
    hard: [
      { id: 86, question: "What is the name of the angel who records deeds?", options: ["Jibril", "Kiraman Katibin", "Malik"], answer: "Kiraman Katibin", explanation: "Kiraman Katibin are the two angels who reside on a person's shoulders and record their deeds." },
      { id: 87, question: "What is the meaning of 'Istikhara'?", options: ["Seeking forgiveness", "Asking for guidance from Allah", "Reciting the Qur'an"], answer: "Asking for guidance from Allah", explanation: "Salat al-Istikhara is a prayer performed when a Muslim needs guidance on a major life decision." },
      { id: 88, question: "What is the name of the sermon given on Fridays and during Eid?", options: ["Khutbah", "Adhan", "Iqamah"], answer: "Khutbah", explanation: "A Khutbah is a sermon delivered during the Friday prayer or on Eid." },
      { id: 89, question: "What is the name of the prayer performed after the night prayer (Isha) and before Fajr?", options: ["Fajr", "Dhuhr", "Tahajjud"], answer: "Tahajjud", explanation: "Tahajjud is an optional night prayer performed by Muslims after Isha prayer." },
      { id: 90, question: "What is the name of the call to prayer?", options: ["Adhan", "Iqamah", "Takbir"], answer: "Adhan", explanation: "Adhan is the Islamic call to prayer recited by a muezzin from the minaret of a mosque." },
    ],
  },
};

export const ACHIEVEMENTS = [
  { id: 'first-win', name: 'First Win!', description: 'Win your first quiz.', icon: '🏆', color: 'text-yellow-500', isUnlocked: false },
  { id: 'five-streak', name: 'Five Streak!', description: 'Answer 5 questions correctly in a row.', icon: '🔥', color: 'text-red-500', isUnlocked: false },
  { id: 'level-up', name: 'Level Up!', description: 'Reach Level 2.', icon: '🌟', color: 'text-blue-500', isUnlocked: false },
  { id: 'quiz-master', name: 'Quiz Master!', description: 'Complete a hard quiz.', icon: '🧠', color: 'text-purple-500', isUnlocked: false },
  { id: 'quran-expert', name: 'Quran Expert', description: 'Complete a Quran quiz on Medium or Hard difficulty.', icon: '📖', color: 'text-emerald-500', isUnlocked: false },
  { id: 'hadith-expert', name: 'Hadith Expert', description: 'Complete a Hadith quiz on Medium or Hard difficulty.', icon: '🎯', color: 'text-amber-500', isUnlocked: false },
  { id: 'seerah-expert', name: 'Seerah Expert', description: 'Complete a Seerah quiz on Medium or Hard difficulty.', icon: '👑', color: 'text-blue-500', isUnlocked: false },
  { id: 'fiqh-expert', name: 'Fiqh Expert', description: 'Complete a Fiqh quiz on Medium or Hard difficulty.', icon: '🏆', color: 'text-purple-500', isUnlocked: false },
  { id: 'history-expert', name: 'History Expert', description: 'Complete an Islamic History quiz on Medium or Hard difficulty.', icon: '⏰', color: 'text-rose-500', isUnlocked: false },
  { id: 'general-expert', name: 'General Expert', description: 'Complete a General Knowledge quiz on Medium or Hard difficulty.', icon: '🏅', color: 'text-indigo-500', isUnlocked: false },
];