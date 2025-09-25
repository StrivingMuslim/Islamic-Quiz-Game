import React, { useState, useEffect, useCallback } from 'react';

// --- CONFIGURATION ---
const QUESTION_CATEGORIES = [
  { id: 'quran', name: 'Quran', color: 'bg-emerald-500', icon: '📖' },
  { id: 'hadith', name: 'Hadith', color: 'bg-amber-500', icon: '🎯' },
  { id: 'seerah', name: 'Seerah', color: 'bg-blue-500', icon: '👑' },
  { id: 'fiqh', name: 'Fiqh', color: 'bg-purple-500', icon: '🏆' },
  { id: 'history', name: 'Islamic History', color: 'bg-rose-500', icon: '⏰' },
  { id: 'general', name: 'General Knowledge', color: 'bg-indigo-500', icon: '🏅' }
];

const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Easy', xp: 10, time: 15, color: 'bg-green-500', questions: 5 },
  { id: 'medium', name: 'Medium', xp: 20, time: 12, color: 'bg-amber-500', questions: 5 },
  { id: 'hard', name: 'Hard', xp: 30, time: 10, color: 'bg-red-500', questions: 5 }
];

// Sample questions (keeping original structure)
const MOCK_QUESTIONS = {
  quran: {
    easy: [
      { id: 1, question: "How many chapters (Surahs) are in the Quran?", options: ["114", "124", "104", "99"], answer: 0, explanation: "The Quran contains 114 Surahs, revealed over 23 years." },
      { id: 2, question: "Which Surah is known as the 'Heart of the Quran'?", options: ["Al-Fatiha", "Yasin", "Al-Baqarah", "Al-Ikhlas"], answer: 1, explanation: "Surah Yasin (Chapter 36) is often called the Heart of the Quran." },
      { id: 3, question: "Which Surah is the first chapter of the Quran?", options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "Al-Nas"], answer: 1, explanation: "Al-Fatiha is the first Surah of the Quran." },
      { id: 4, question: "How many verses (Ayat) are in the Quran?", options: ["6236", "6666", "6000", "7000"], answer: 0, explanation: "The Quran contains 6236 verses." },
      { id: 5, question: "Which Surah has the most verses?", options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"], answer: 0, explanation: "Surah Al-Baqarah has 286 verses." }
    ],
    medium: [
      { id: 6, question: "Which Prophet is mentioned most frequently in the Quran?", options: ["Musa (Moses)", "Ibrahim (Abraham)", "Isa (Jesus)", "Nuh (Noah)"], answer: 0, explanation: "Prophet Musa is mentioned 136 times in the Quran." },
      { id: 7, question: "In which Surah is the story of the People of the Elephant mentioned?", options: ["Al-Fil", "Al-Quraish", "Al-Ma'un", "Al-Kawthar"], answer: 0, explanation: "Surah Al-Fil (Chapter 105) describes this historical event." },
      { id: 8, question: "Which Surah contains the verse about the creation of Adam?", options: ["Al-Baqarah", "Al-A'raf", "Al-Hijr", "Ta-Ha"], answer: 1, explanation: "The creation of Adam is mentioned in Surah Al-A'raf." },
      { id: 9, question: "Which Surah is known as the 'Verse of the Throne'?", options: ["Al-Baqarah", "Al-Imran", "Al-Mu'minun", "Al-Furqan"], answer: 0, explanation: "Ayat al-Kursi is in Surah Al-Baqarah, verse 255." },
      { id: 10, question: "Which Surah was revealed first?", options: ["Al-Alaq", "Al-Fatiha", "Al-Muddaththir", "Al-Muzzammil"], answer: 0, explanation: "Surah Al-Alaq, verses 1-5, were the first to be revealed." }
    ],
    hard: [
      { id: 11, question: "Which Surah contains the longest verse in the Quran?", options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"], answer: 0, explanation: "Verse 282 of Surah Al-Baqarah is the longest verse in the Quran." },
      { id: 12, question: "Which Surah does not begin with Bismillah?", options: ["At-Tawbah", "Al-Bara'ah", "Al-Fatir", "Al-Qasas"], answer: 0, explanation: "Surah At-Tawbah is the only Surah that does not begin with Bismillah." },
      { id: 13, question: "Which Surah is known as the 'Queen of Surahs'?", options: ["Al-Baqarah", "Yasin", "Al-Fatiha", "Ar-Rahman"], answer: 2, explanation: "Al-Fatiha is sometimes called the Queen of Surahs." },
      { id: 14, question: "Which Surah contains the story of Prophet Yusuf?", options: ["Yusuf", "Yusuf", "Al-Qasas", "Al-Anbiya"], answer: 1, explanation: "The story of Prophet Yusuf is in Surah Yusuf." },
      { id: 15, question: "How many Surahs are named after animals?", options: ["5", "6", "7", "8"], answer: 2, explanation: "There are 7 Surahs named after animals: Al-Baqarah, Al-Nahl, Al-Naml, Al-'Ankabut, Al-Fil, Al-Ma'ida, Al-Tin." }
    ]
  },
  // ... (Other categories remain the same, just add unique IDs)
  hadith: {
    easy: [
      { id: 16, question: "How many authentic Hadith collections are known as 'Sihah Sittah'?", options: ["6", "5", "7", "4"], answer: 0, explanation: "The six authentic Hadith collections are known as Sihah Sittah." },
      { id: 17, question: "What does 'Sahih' mean in Hadith terminology?", options: ["Authentic", "Weak", "Good", "Fabricated"], answer: 0, explanation: "Sahih means authentic in Hadith terminology." },
      { id: 18, question: "Which Hadith collection is considered the most authentic after the Quran?", options: ["Sahih Bukhari", "Sahih Muslim", "Sunan Abu Dawood", "Jami' al-Tirmidhi"], answer: 0, explanation: "Sahih Bukhari is considered the most authentic Hadith collection after the Quran." },
      { id: 19, question: "How many Hadith are in Sahih Bukhari?", options: ["7000", "6000", "7500", "8000"], answer: 0, explanation: "Sahih Bukhari contains about 7000 Hadith." },
      { id: 20, question: "What is the meaning of 'Hadith'?", options: ["Speech", "Action", "News", "All of the above"], answer: 3, explanation: "Hadith refers to the sayings, actions, and approvals of Prophet Muhammad (PBUH)." }
    ],
    medium: [
      { id: 21, question: "Who compiled the Hadith collection 'Sahih Muslim'?", options: ["Imam Muslim", "Imam Bukhari", "Imam Abu Dawood", "Imam Tirmidhi"], answer: 0, explanation: "Imam Muslim ibn al-Hajjaj compiled Sahih Muslim." },
      { id: 22, question: "What is the meaning of 'Sunnah'?", options: ["Path", "Practice", "Example", "All of the above"], answer: 3, explanation: "Sunnah refers to the way of the Prophet, including his words, actions, and approvals." },
      { id: 23, question: "Which Hadith collection is known for its focus on legal matters?", options: ["Sunan Abu Dawood", "Sunan al-Tirmidhi", "Sunan Ibn Majah", "Sunan al-Nasa'i"], answer: 0, explanation: "Sunan Abu Dawood is known for its focus on legal matters." },
      { id: 24, question: "What is the term for a Hadith with a broken chain of narrators?", options: ["Mursal", "Musnad", "Mutawatir", "Mutaq"], answer: 0, explanation: "Mursal refers to a Hadith with a broken chain of narrators." },
      { id: 25, question: "Which Hadith collection is the largest?", options: ["Sunan Ibn Majah", "Sunan al-Tirmidhi", "Sunan al-Nasa'i", "Sunan Abu Dawood"], answer: 0, explanation: "Sunan Ibn Majah is the largest of the Sihah Sittah." }
    ],
    hard: [
      { id: 26, question: "What is the term for a Hadith with a continuous chain of narrators?", options: ["Mutawatir", "Mursal", "Musnad", "Da'if"], answer: 2, explanation: "Musnad refers to a Hadith with an unbroken chain of narrators back to the Prophet." },
      { id: 27, question: "Which Hadith is about the five pillars of Islam?", options: ["Hadith Jibril", "Hadith al-Nawawi", "Hadith al-Arbain", "Hadith Sahih"], answer: 0, explanation: "Hadith Jibril is the Hadith that explains the five pillars of Islam." },
      { id: 28, question: "What does 'Mutawatir' mean in Hadith terminology?", options: ["Consecutive", "Widespread", "Continuous", "Authentic"], answer: 1, explanation: "Mutawatir means a Hadith reported by so many narrators that it would be impossible for them to conspire to fabricate it." },
      { id: 29, question: "Which Hadith collection focuses on matters of faith?", options: ["Sahih Bukhari", "Sahih Muslim", "Al-Adab al-Mufrad", "Musnad Ahmad"], answer: 2, explanation: "Al-Adab al-Mufrad by Imam Bukhari focuses on matters of faith and character." },
      { id: 30, question: "Who compiled the first Hadith collection?", options: ["Muhammad ibn Muslim", "Abu Hurairah", "Umar ibn al-Khattab", "Ali ibn Abi Talib"], answer: 0, explanation: "Muhammad ibn Muslim (Ibn Shihab al-Zuhri) compiled one of the earliest Hadith collections." }
    ]
  },
  seerah: {
    easy: [
      { id: 31, question: "In which year was Prophet Muhammad (PBUH) born?", options: ["570 CE", "580 CE", "560 CE", "590 CE"], answer: 0, explanation: "The Prophet was born in 570 CE in Makkah." },
      { id: 32, question: "What is the name of Prophet Muhammad's (PBUH) father?", options: ["Abdullah", "Abu Talib", "Abu Lahab", "Hashim"], answer: 0, explanation: "Prophet Muhammad's father was Abdullah ibn Abd al-Muttalib." },
      { id: 33, question: "Who was the first wife of Prophet Muhammad (PBUH)?", options: ["Khadijah", "Aisha", "Hafsa", "Umm Salama"], answer: 0, explanation: "Khadijah bint Khuwaylid was the first wife of Prophet Muhammad (PBUH)." },
      { id: 34, question: "What is the name of Prophet Muhammad's (PBUH) mother?", options: ["Aminah", "Hawwa", "Maryam", "Sarah"], answer: 0, explanation: "Prophet Muhammad's mother was Aminah bint Wahb." },
      { id: 35, question: "In which year did the Hijrah (migration to Madinah) occur?", options: ["622 CE", "620 CE", "625 CE", "618 CE"], answer: 0, explanation: "The Hijrah occurred in 622 CE, marking the beginning of the Islamic calendar." }
    ],
    medium: [
      { id: 36, question: "How many years did the Prophet live in Madinah after Hijrah?", options: ["10 years", "8 years", "12 years", "6 years"], answer: 0, explanation: "The Prophet lived in Madinah for 10 years until his passing." },
      { id: 37, question: "What was the name of the cave where Prophet Muhammad (PBUH) received his first revelation?", options: ["Hira", "Thawr", "Ghar", "Hira'"], answer: 0, explanation: "The first revelation came to Prophet Muhammad (PBUH) in Cave Hira." },
      { id: 38, question: "Who was the first male to accept Islam?", options: ["Abu Bakr", "Ali ibn Abi Talib", "Zayd ibn Harithah", "Umar ibn al-Khattab"], answer: 1, explanation: "Ali ibn Abi Talib was the first male to accept Islam." },
      { id: 39, question: "What was the name of Prophet Muhammad's (PBUH) wet nurse?", options: ["Halima", "Khawlah", "Barakah", "Umm Ayman"], answer: 0, explanation: "Halima al-Sa'dia was Prophet Muhammad's wet nurse." },
      { id: 40, question: "Which battle was the first major battle between Muslims and Quraish?", options: ["Battle of Badr", "Battle of Uhud", "Battle of Khandaq", "Battle of Hunayn"], answer: 0, explanation: "The Battle of Badr was the first major battle between Muslims and Quraish." }
    ],
    hard: [
      { id: 41, question: "Which battle occurred in the 3rd year of Hijrah?", options: ["Battle of Uhud", "Battle of Badr", "Battle of Khandaq", "Battle of Hunayn"], answer: 0, explanation: "The Battle of Uhud took place in 3 AH." },
      { id: 42, question: "What was the name of the treaty between Muslims and Quraish in 6 AH?", options: ["Treaty of Hudaybiyyah", "Treaty of Madinah", "Treaty of Makkah", "Treaty of Ta'if"], answer: 0, explanation: "The Treaty of Hudaybiyyah was signed in 6 AH." },
      { id: 43, question: "How many children did Prophet Muhammad (PBUH) have?", options: ["7", "6", "5", "4"], answer: 0, explanation: "Prophet Muhammad (PBUH) had 7 children, 6 from Khadijah and 1 from Maria al-Qibtiyya." },
      { id: 44, question: "Which companion was known as 'The Lion of Allah'?", options: ["Hamzah ibn Abd al-Muttalib", "Ali ibn Abi Talib", "Umar ibn al-Khattab", "Abu Dujana"], answer: 0, explanation: "Hamzah ibn Abd al-Muttalib was known as 'The Lion of Allah'." },
      { id: 45, question: "What was the name of the last sermon delivered by Prophet Muhammad (PBUH)?", options: ["Farewell Sermon", "Sermon of Arafat", "Sermon of Madinah", "Sermon of Mina"], answer: 0, explanation: "The Farewell Sermon was delivered at Mount Arafat during the last Hajj." }
    ]
  },
  fiqh: {
    easy: [
      { id: 46, question: "How many obligatory prayers are there in a day?", options: ["5", "4", "6", "3"], answer: 0, explanation: "There are five obligatory daily prayers in Islam." },
      { id: 47, question: "What is the first pillar of Islam?", options: ["Shahada", "Salah", "Zakat", "Sawm"], answer: 0, explanation: "The Shahada (declaration of faith) is the first pillar of Islam." },
      { id: 48, question: "How many times is Zakat paid?", options: ["Once a year", "Twice a year", "Monthly", "Quarterly"], answer: 0, explanation: "Zakat is paid once a year when one's wealth reaches the nisab." },
      { id: 49, question: "What is the name of the month of fasting?", options: ["Ramadan", "Shawwal", "Dhu al-Hijjah", "Muharram"], answer: 0, explanation: "Ramadan is the month of fasting in the Islamic calendar." },
      { id: 50, question: "What is the minimum age for Hajj?", options: ["Puberty", "18", "21", "No minimum age"], answer: 0, explanation: "Hajj is obligatory upon those who have reached puberty and have the means." }
    ],
    medium: [
      { id: 51, question: "What is the minimum amount of wealth that makes Zakat obligatory?", options: ["Nisab", "Fidyah", "Kaffarah", "Sadaqah"], answer: 0, explanation: "Nisab is the minimum threshold of wealth that makes Zakat obligatory." },
      { id: 52, question: "What is the ruling on performing Umrah?", options: ["Sunnah", "Wajib", "Fard", "Makruh"], answer: 0, explanation: "Umrah is considered Sunnah and is recommended but not obligatory." },
      { id: 53, question: "What is the meaning of 'Ijma' in Islamic jurisprudence?", options: ["Consensus", "Reasoning", "Analogy", "Text"], answer: 0, explanation: "Ijma refers to the consensus of Islamic scholars on a legal matter." },
      { id: 54, question: "What is the ruling on interest (riba) in Islam?", options: ["Haram", "Halal", "Makruh", "Mubah"], answer: 0, explanation: "Interest (riba) is strictly prohibited in Islam." },
      { id: 55, question: "What is the meaning of 'Qiyas' in Islamic jurisprudence?", options: ["Analogy", "Consensus", "Reasoning", "Text"], answer: 0, explanation: "Qiyas refers to analogical reasoning in Islamic jurisprudence." }
    ],
    hard: [
      { id: 56, question: "Which school of Islamic jurisprudence is predominant in Saudi Arabia?", options: ["Hanbali", "Maliki", "Shafi'i", "Hanafi"], answer: 0, explanation: "The Hanbali school is predominant in Saudi Arabia." },
      { id: 57, question: "What is the ruling on music in Islamic jurisprudence?", options: ["Varies", "Haram", "Halal", "Makruh"], answer: 0, explanation: "The ruling on music varies among different schools of thought." },
      { id: 58, question: "What is the meaning of 'Ijtihad' in Islamic jurisprudence?", options: ["Independent reasoning", "Following precedent", "Consensus", "Text"], answer: 0, explanation: "Ijtihad refers to independent reasoning in Islamic jurisprudence." },
      { id: 59, question: "Which school of thought allows the consumption of all seafood?", options: ["Hanafi", "Maliki", "Shafi'i", "All of them"], answer: 3, explanation: "All four schools of thought allow the consumption of all seafood." },
      { id: 60, question: "What is the term for a temporary marriage in Islamic jurisprudence?", options: ["Nikah Mut'ah", "Nikah Misyar", "Nikah 'Urfi", "Nikah Quduri"], answer: 0, explanation: "Nikah Mut'ah is the term for a temporary marriage." }
    ]
  },
  history: {
    easy: [
      { id: 61, question: "Who was the first Caliph after Prophet Muhammad (PBUH)?", options: ["Abu Bakr", "Umar", "Uthman", "Ali"], answer: 0, explanation: "Abu Bakr As-Siddiq was the first Caliph." },
      { id: 62, question: "In which year did the Battle of Badr occur?", options: ["2 AH", "3 AH", "4 AH", "5 AH"], answer: 0, explanation: "The Battle of Badr occurred in 2 AH." },
      { id: 63, question: "Who was the second Caliph of Islam?", options: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib", "Abu Bakr"], answer: 0, explanation: "Umar ibn al-Khattab was the second Caliph." },
      { id: 64, question: "In which century did the Islamic Golden Age begin?", options: ["8th", "7th", "9th", "10th"], answer: 0, explanation: "The Islamic Golden Age began in the 8th century." },
      { id: 65, question: "What is the name of the first Islamic university?", options: ["Al-Azhar", "Al-Qarawiyyin", "Al-Mustansiriya", "Nizamiyya"], answer: 1, explanation: "Al-Qarawiyyin in Fez, Morocco, is considered the first Islamic university." }
    ],
    medium: [
      { id: 66, question: "In which century did the Ottoman Empire reach its peak?", options: ["16th century", "15th century", "17th century", "14th century"], answer: 0, explanation: "The Ottoman Empire reached its peak in the 16th century under Suleiman the Magnificent." },
      { id: 67, question: "Who founded the Fatimid dynasty?", options: ["Ubaid Allah al-Mahdi", "Al-Mu'izz li-Din Allah", "Al-Aziz", "Al-Hakim"], answer: 0, explanation: "Ubaid Allah al-Mahdi founded the Fatimid dynasty." },
      { id: 68, question: "In which year did the Crusades begin?", options: ["1095", "1096", "1097", "1098"], answer: 1, explanation: "The First Crusade began in 1096." },
      { id: 69, question: "What was the name of the Islamic empire that ruled Spain?", options: ["Umayyad Caliphate", "Almoravid Empire", "Almohad Empire", "Caliphate of Cordoba"], answer: 3, explanation: "The Caliphate of Cordoba ruled Islamic Spain." },
      { id: 70, question: "Who was the founder of the Umayyad dynasty?", options: ["Muawiya ibn Abi Sufyan", "Umar ibn Abd al-Aziz", "Abd al-Malik", "Yazid ibn Muawiya"], answer: 0, explanation: "Muawiya ibn Abi Sufyan founded the Umayyad dynasty." }
    ],
    hard: [
      { id: 71, question: "Who founded the Almoravid dynasty in North Africa?", options: ["Abdallah ibn Yasin", "Yusuf ibn Tashfin", "Ali ibn Yusuf", "Tashfin ibn Ali"], answer: 0, explanation: "Abdallah ibn Yasin was the spiritual founder of the Almoravid dynasty." },
      { id: 72, question: "What was the name of the Islamic philosopher known as Averroes in the West?", options: ["Ibn Rushd", "Ibn Sina", "Al-Ghazali", "Al-Kindi"], answer: 0, explanation: "Ibn Rushd was known as Averroes in the West." },
      { id: 73, question: "In which year did the Mongols sack Baghdad?", options: ["1258", "1260", "1240", "1270"], answer: 0, explanation: "The Mongols sacked Baghdad in 1258, ending the Abbasid Caliphate." },
      { id: 74, question: "Who was the last Caliph of the Ottoman Empire?", options: ["Abdulmejid II", "Mehmed VI", "Abdulhamid II", "Suleiman the Magnificent"], answer: 0, explanation: "Abdulmejid II was the last Caliph of the Ottoman Empire." },
      { id: 75, question: "What was the name of the Islamic ruler who defeated the Crusaders at the Battle of Hattin?", options: ["Saladin", "Nur al-Din", "Imad al-Din Zengi", "Kilij Arslan"], answer: 0, explanation: "Saladin defeated the Crusaders at the Battle of Hattin in 1187." }
    ]
  },
  general: {
    easy: [
      { id: 76, question: "What is the name of the Islamic declaration of faith?", options: ["Shahada", "Takbir", "Tasbih", "Tahlil"], answer: 0, explanation: "The Shahada is the Islamic declaration of faith: 'La ilaha illallah, Muhammadur rasulullah.'" },
      { id: 77, question: "Which month is Ramadan in the Islamic calendar?", options: ["9th", "10th", "8th", "7th"], answer: 0, explanation: "Ramadan is the 9th month of the Islamic lunar calendar." },
      { id: 78, question: "How many times is the word 'Allah' mentioned in the Quran?", options: ["2698", "2700", "2697", "2699"], answer: 0, explanation: "The word 'Allah' is mentioned 2698 times in the Quran." },
      { id: 79, question: "What is the name of the first Surah of the Quran?", options: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "Al-Nas"], answer: 0, explanation: "Al-Fatiha is the first Surah of the Quran." },
      { id: 80, question: "What is the meaning of 'Sunnah'?", options: ["Path", "Practice", "Example", "All of the above"], answer: 3, explanation: "Sunnah refers to the way of the Prophet, including his words, actions, and approvals." }
    ],
    medium: [
      { id: 81, question: "What is the name of the night journey of Prophet Muhammad (PBUH)?", options: ["Isra and Mi'raj", "Hijrah", "Fath Makkah", "Hudaybiyyah"], answer: 0, explanation: "Isra and Mi'raj refers to the night journey and ascension of Prophet Muhammad (PBUH)." },
      { id: 82, question: "What is the meaning of 'Jihad' in Islam?", options: ["Struggle", "War", "Fight", "Battle"], answer: 0, explanation: "Jihad means struggle or striving in the path of Allah, both internal and external." },
      { id: 83, question: "How many times is the name 'Muhammad' mentioned in the Quran?", options: ["4", "5", "3", "6"], answer: 0, explanation: "The name 'Muhammad' is mentioned 4 times in the Quran." },
      { id: 84, question: "What is the meaning of 'Hijab' in Arabic?", options: ["Barrier", "Cover", "Modesty", "Cloth"], answer: 0, explanation: "Hijab literally means barrier or partition in Arabic." },
      { id: 85, question: "What is the term for the Islamic calendar?", options: ["Hijri", "Gregorian", "Lunar", "Solar"], answer: 0, explanation: "The Islamic calendar is called the Hijri calendar." },
    ],
    hard: [
      { id: 86, question: "What is the meaning of 'Tawhid' in Islam?", options: ["Oneness of Allah", "Prophethood", "Divine Justice", "Day of Judgment"], answer: 0, explanation: "Tawhid refers to the fundamental Islamic belief in the oneness of Allah." },
      { id: 87, question: "What is the meaning of 'Ihsan' in Islam?", options: ["Excellence", "Worship", "Piety", "Faith"], answer: 0, explanation: "Ihsan means to worship Allah as if you see Him, or knowing He sees you." },
      { id: 88, question: "What is the name of the Islamic concept of 'predestination'?", options: ["Qadar", "Qada", "Tawakkul", "Tawhid"], answer: 0, explanation: "Qadar refers to the Islamic belief in predestination." },
      { id: 89, question: "What is the meaning of 'Sufism'?", options: ["Islamic mysticism", "Islamic jurisprudence", "Islamic theology", "Islamic philosophy"], answer: 0, explanation: "Sufism is the mystical dimension of Islam." },
      { id: 90, question: "What is the name of the Islamic concept of 'social justice'?", options: ["Adl", "Ihsan", "Amr bil Ma'ruf", "Tazkiyah"], answer: 0, explanation: "Adl refers to justice and fairness in Islamic teachings." }
    ]
  }
};

const ACHIEVEMENTS = [
  { id: 'first_game', name: 'First Steps', description: 'Complete your first quiz', icon: '⭐', earned: false },
  { id: 'quran_master', name: 'Quran Master', description: 'Score 100+ in Quran category', icon: '📖', earned: false },
  { id: 'hadith_expert', name: 'Hadith Expert', description: 'Score 100+ in Hadith category', icon: '🎯', earned: false },
  { id: 'seerah_scholar', name: 'Seerah Scholar', description: 'Score 100+ in Seerah category', icon: '👑', earned: false },
  { id: 'fiqh_fanatic', name: 'Fiqh Fanatic', description: 'Score 100+ in Fiqh category', icon: '🏆', earned: false },
  { id: 'history_buff', name: 'History Buff', description: 'Score 100+ in History category', icon: '⏰', earned: false },
  { id: 'general_knowledge', name: 'General Knowledge', description: 'Score 100+ in General category', icon: '🏅', earned: false },
  { id: 'perfect_round', name: 'Perfect Round', description: 'Answer all questions correctly', icon: '🏅', earned: false },
  { id: 'level_5', name: 'Scholar', description: 'Reach level 5', icon: '🏆', earned: false },
  { id: 'streak_5', name: 'Hot Streak', description: '5 correct answers in a row', icon: '⚡', earned: false }
];

// --- ISLAMIC FACTS ---
const ISLAMIC_FACTS = [
  "The word 'Islam' means 'submission' in Arabic, referring to submission to the will of God.",
  "The Quran is believed by Muslims to be the literal word of God as revealed to Prophet Muhammad (PBUH).",
  "Prophet Muhammad (PBUH) was born in Makkah around 570 CE.",
  "The Five Pillars of Islam are Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting during Ramadan), and Hajj (pilgrimage to Makkah).",
  "The Kaaba in Makkah is the holiest site in Islam and the direction (Qibla) Muslims face during prayer.",
  "The Islamic calendar is a lunar calendar, starting from the Hijra (migration) of Prophet Muhammad (PBUH) from Makkah to Madinah in 622 CE.",
  "The first revelation of the Quran to Prophet Muhammad (PBUH) occurred in the Cave of Hira.",
  "There are 99 names of Allah in Islamic tradition, each reflecting a divine attribute.",
  "The Hadith are collections of reports about the words, actions, and approvals of Prophet Muhammad (PBUH).",
  "The Battle of Badr was the first major military victory for the early Muslim community.",
  "The city of Madinah is known as the 'City of the Prophet' and is the second holiest city in Islam.",
  "Zakat is the obligatory giving of a portion of one's wealth to help the poor and needy.",
  "The Quran emphasizes the importance of seeking knowledge, stating 'Seek knowledge from the cradle to the grave.'",
  "The concept of Ihsan in Islam means to worship Allah as if you see Him, or knowing He sees you.",
  "The Ottoman Empire was one of the largest and longest-lasting empires in history, lasting over 600 years.",
  "Al-Azhar University in Cairo, founded in 970 CE, is one of the oldest continuously operating universities in the world.",
  "The Islamic Golden Age saw significant advancements in science, mathematics, medicine, and philosophy.",
  "The night journey and ascension of Prophet Muhammad (PBUH) is known as Isra and Mi'raj.",
  "The Quran has been preserved in its original Arabic text for over 1400 years.",
  "The concept of Jihad in Islam primarily refers to the internal struggle against one's own ego and desires."
];

// --- COMPONENTS ---
const LoadingScreen = ({ currentFact, loadingState }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center p-4">
    <div className="text-center max-w-md w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-4">
        {loadingState === 'loading_question' ? 'Preparing your next question...' : 'Loading...'}
      </h2>
      {currentFact && (
        <div className="bg-white rounded-xl shadow-md p-4 border border-emerald-200">
          <p className="text-gray-700 italic">💡 Did you know?</p>
          <p className="text-gray-800 mt-1">{currentFact}</p>
        </div>
      )}
    </div>
  </div>
);

const MenuScreen = ({ playerName, setPlayerName, level, xp, selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, startGame }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-2">Islamic Quiz Challenge!</h1>
        <p className="text-emerald-600 text-lg">Test your knowledge on all aspects of Islam!</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (for scoreboard):</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value || 'Player')}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-64 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Level</div>
              <div className="text-2xl font-bold text-emerald-600">{level}</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm text-gray-600">XP</div>
              <div className="text-2xl font-bold text-amber-600">{xp}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Category:</h2>
        <div className="text-lg text-gray-600 mb-4">Selected Category: {selectedCategory === 'any' ? 'Any Category' : QUESTION_CATEGORIES.find(c => c.id === selectedCategory)?.name}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedCategory('any')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCategory === 'any'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            Any Category
          </button>
          {QUESTION_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${
                selectedCategory === category.id
                  ? `${category.color} text-white border-transparent`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl mb-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Difficulty:</h2>
        <div className="text-lg text-gray-600 mb-4">Selected Difficulty: {selectedDifficulty === 'none' ? 'Any' : DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.name}</div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedDifficulty('none')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedDifficulty === 'none'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            Any
          </button>
          {DIFFICULTY_LEVELS.map((difficulty) => (
            <button
              key={difficulty.id}
              onClick={() => setSelectedDifficulty(difficulty.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedDifficulty === difficulty.id
                  ? `${difficulty.color} text-white border-transparent`
                  : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              {difficulty.name}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {selectedDifficulty !== 'none' && selectedDifficulty !== 'any' && (
            <p>Questions: {DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.questions}</p>
          )}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg"
        >
          Start Quiz Challenge!
        </button>
      </div>
    </div>
  </div>
);

const QuestionScreen = ({ currentQuestion, currentQuestionIndex, questions, timeLeft, selectedAnswer, answerFeedback, handleAnswerSelect, streak, progress }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="text-center md:text-left">
              <div className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Time</div>
                <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-amber-600'}`}>
                  {timeLeft}s
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Streak</div>
                <div className="text-2xl font-bold text-blue-600">{streak}</div>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {currentQuestion?.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                    : selectedAnswer === index
                      ? currentQuestion.answer === index
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-500 text-red-100'
                      : index === currentQuestion.answer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 opacity-50'
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {answerFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${
              answerFeedback.correct ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
            }`}>
              <div className="font-semibold mb-2">
                {answerFeedback.correct ? '✓ Correct!' : '✗ Incorrect!'}
              </div>
              <div className="text-gray-700">{answerFeedback.explanation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GameOverScreen = ({ score, selectedDifficulty, selectedCategory, maxStreak, resetGame, setGameState }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-2">Game Over!</h1>
        <p className="text-emerald-600 text-lg">Your Final Score: <span className="font-bold text-2xl text-amber-600">{score}</span></p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-sm text-emerald-600">Difficulty</div>
            <div className="text-lg font-bold text-emerald-800">{DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.name}</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-sm text-amber-600">Category</div>
            <div className="text-lg font-bold text-amber-800">{selectedCategory === 'any' ? 'Any Category' : QUESTION_CATEGORIES.find(c => c.id === selectedCategory)?.name}</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Max Streak</div>
            <div className="text-lg font-bold text-blue-800">{maxStreak}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetGame}
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            ↺
            Play Again
          </button>
          <button
            onClick={() => setGameState('scoreboard')}
            className="flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            🏆
            View Scoreboard
          </button>
          <button
            onClick={() => {
              const shareText = `I scored ${score} points in Islamic Quiz Challenge! Test your Islamic knowledge: https://islamic-quiz-challenge.web.app`;
              if (navigator.share) {
                navigator.share({ title: 'Islamic Quiz Challenge', text: shareText });
              } else {
                navigator.clipboard.writeText(shareText);
                alert('Score shared to clipboard!');
              }
            }}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📤
            Share Score
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ScoreboardScreen = ({ playerName, score, level, selectedCategory, selectedDifficulty, achievements, resetGame }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-2">Scoreboard</h1>
        <p className="text-emerald-600">Your Performance</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Score</h2>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-lg">
          <div className="text-lg font-semibold">{playerName}</div>
          <div className="text-2xl font-bold">{score} points</div>
          <div className="text-sm opacity-90">Level {level} • {selectedCategory === 'any' ? 'Any Category' : QUESTION_CATEGORIES.find(c => c.id === selectedCategory)?.name} • {DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.name}</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">🏆 My Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{achievement.icon}</span>
                <span className={`font-semibold ${
                  achievement.earned ? 'text-emerald-800' : 'text-gray-600'
                }`}>
                  {achievement.name}
                </span>
                {achievement.earned && <span className="text-amber-500">⭐</span>}
              </div>
              <p className={`text-sm ${
                achievement.earned ? 'text-emerald-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all"
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [gameState, setGameState] = useState('loading');
  const [playerName, setPlayerName] = useState('Player');
  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [selectedDifficulty, setSelectedDifficulty] = useState('none');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Use the full mock database for simulation
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // --- NEW STATES FOR AI SIMULATION ---
  const [loadingState, setLoadingState] = useState('idle'); // 'idle', 'loading_question', 'loading_fact'
  const [currentFact, setCurrentFact] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState('menu');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- SIMULATE AI API CALL ---
  const simulateAIQuestionGeneration = useCallback((category, difficulty) => {
    return new Promise((resolve) => {
      // Simulate API call delay (e.g., 1-2 seconds)
      setTimeout(() => {
        // In a real implementation, this would be the response from the AI API
        // For simulation, we'll pick a random question from the mock DB matching the criteria
        let availableQuestions = [];
        if (category === 'any') {
          Object.values(MOCK_QUESTIONS).forEach(cat => {
            if (cat[difficulty]) {
              availableQuestions = availableQuestions.concat(cat[difficulty]);
            }
          });
        } else {
          availableQuestions = MOCK_QUESTIONS[category][difficulty] || [];
        }

        if (availableQuestions.length > 0) {
          const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
          resolve(randomQuestion);
        } else {
          // Fallback if no questions match (shouldn't happen with mock DB)
          resolve({
            id: -1,
            question: "Unable to generate question. Please try again.",
            options: ["Retry", "Retry", "Retry", "Retry"],
            answer: 0,
            explanation: "An error occurred during question generation."
          });
        }
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    });
  }, []);

  const startGame = useCallback(async () => {
    let catId = selectedCategory;
    if (catId === 'any') {
      catId = QUESTION_CATEGORIES[Math.floor(Math.random() * QUESTION_CATEGORIES.length)].id;
    }
    let diffId = selectedDifficulty;
    if (diffId === 'none') {
      diffId = 'easy';
    }

    setLoadingState('loading_fact');
    setCurrentFact(ISLAMIC_FACTS[Math.floor(Math.random() * ISLAMIC_FACTS.length)]);

    // Simulate fetching initial batch of questions (or just the first one)
    // For simplicity in this simulation, we'll just fetch the first question here
    // and then fetch subsequent ones in handleAnswerSelect
    try {
        setLoadingState('loading_question');
        const firstQuestion = await simulateAIQuestionGeneration(catId, diffId);

        setQuestions([firstQuestion]); // Start with the first generated question
        setCurrentQuestionIndex(0);
        setCurrentQuestion(firstQuestion);
        setScore(0);
        setSelectedAnswer(null);
        setAnswerFeedback(null);
        setStreak(0);
        setMaxStreak(0);
        setGameState('playing');
        setTimeLeft(DIFFICULTY_LEVELS.find(d => d.id === diffId)?.time || 15);
        setLoadingState('idle'); // Reset loading state after setting question
    } catch (error) {
        console.error("Error starting game:", error);
        // Handle error, maybe show a message and fallback to menu
        setGameState('menu');
        setLoadingState('idle');
    }
  }, [selectedCategory, selectedDifficulty, simulateAIQuestionGeneration]);

  const handleAnswerSelect = useCallback(async (index) => {
    if (selectedAnswer !== null || loadingState !== 'idle') return; // Prevent multiple selections or actions during loading

    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.answer;

    if (isCorrect) {
      const points = DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.xp || 10;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, streak + 1));
      setAnswerFeedback({ correct: true, explanation: currentQuestion.explanation });
      setXp(prev => prev + points);
      const newLevel = Math.floor((xp + points) / 100);
      if (newLevel > level) {
        setLevel(newLevel);
      }
    } else {
      setStreak(0);
      setAnswerFeedback({ correct: false, explanation: currentQuestion.explanation });
    }

    // Move to next question after delay
    setTimeout(async () => {
      if (currentQuestionIndex < DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.questions - 1) { // Check against desired question count
        // Simulate fetching the *next* question from AI
        setLoadingState('loading_fact');
        setCurrentFact(ISLAMIC_FACTS[Math.floor(Math.random() * ISLAMIC_FACTS.length)]);

        try {
            setLoadingState('loading_question');
            const nextQuestion = await simulateAIQuestionGeneration(selectedCategory, selectedDifficulty);

            // Update the questions array and current question
            setQuestions(prev => [...prev, nextQuestion]); // Add the new question to the list
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setAnswerFeedback(null);
            setTimeLeft(DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.time || 15);
            setLoadingState('idle');
        } catch (error) {
            console.error("Error fetching next question:", error);
            // Handle error, maybe show a message or use a fallback question
            setGameState('menu'); // Fallback to menu on error
            setLoadingState('idle');
        }
      } else {
        // Game over
        setGameState('gameOver');
        checkAchievements();
      }
    }, 2000);
  }, [selectedAnswer, currentQuestion, selectedDifficulty, selectedCategory, streak, level, xp, currentQuestionIndex, loadingState, simulateAIQuestionGeneration]);

  const checkAchievements = () => {
    const newAchievements = achievements.map(achievement => {
      if (achievement.earned) return achievement;
      switch (achievement.id) {
        case 'first_game':
          return { ...achievement, earned: true };
        case 'quran_master':
          return { ...achievement, earned: selectedCategory === 'quran' && score >= 100 };
        case 'hadith_expert':
          return { ...achievement, earned: selectedCategory === 'hadith' && score >= 100 };
        case 'seerah_scholar':
          return { ...achievement, earned: selectedCategory === 'seerah' && score >= 100 };
        case 'fiqh_fanatic':
          return { ...achievement, earned: selectedCategory === 'fiqh' && score >= 100 };
        case 'history_buff':
          return { ...achievement, earned: selectedCategory === 'history' && score >= 100 };
        case 'general_knowledge':
          return { ...achievement, earned: selectedCategory === 'general' && score >= 100 };
        case 'perfect_round':
          // This needs to be re-evaluated based on the actual number of questions played vs. correct answers
          // For this simulation, assuming 'questions' array holds all generated questions
          const correctAnswers = questions.filter((q, i) => i < currentQuestionIndex + 1 && q.answer === (questions[i].userAnswer || -1)).length;
          return { ...achievement, earned: correctAnswers === questions.length && questions.length > 0 };
        case 'level_5':
          return { ...achievement, earned: level >= 5 };
        case 'streak_5':
          return { ...achievement, earned: maxStreak >= 5 };
        default:
          return achievement;
      }
    });
    setAchievements(newAchievements);
  };

  const resetGame = () => {
    setGameState('menu');
    setSelectedCategory('any');
    setSelectedDifficulty('none');
    setCurrentQuestion(null);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setScore(0);
    setTimeLeft(0);
    setStreak(0);
    setMaxStreak(0);
    setLoadingState('idle');
    setCurrentFact('');
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null && loadingState === 'idle') {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0 && selectedAnswer === null && loadingState === 'idle') {
      handleAnswerSelect(-1); // Time's up
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, selectedAnswer, handleAnswerSelect, loadingState]);

  // Calculate progress for the progress bar
  const progress = questions.length > 0 ? ((currentQuestionIndex) / DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)?.questions) * 100 : 0;

  // Render based on gameState and loadingState
  if (loadingState !== 'idle') {
    return <LoadingScreen currentFact={currentFact} loadingState={loadingState} />;
  }

  if (gameState === 'loading') return <div>Loading...</div>; // Or the original loading screen if needed initially
  if (gameState === 'menu') return (
    <MenuScreen
      playerName={playerName}
      setPlayerName={setPlayerName}
      level={level}
      xp={xp}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedDifficulty={selectedDifficulty}
      setSelectedDifficulty={setSelectedDifficulty}
      startGame={startGame}
    />
  );
  if (gameState === 'playing') return (
    <QuestionScreen
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      questions={questions}
      timeLeft={timeLeft}
      selectedAnswer={selectedAnswer}
      answerFeedback={answerFeedback}
      handleAnswerSelect={handleAnswerSelect}
      streak={streak}
      progress={progress}
    />
  );
  if (gameState === 'gameOver') return (
    <GameOverScreen
      score={score}
      selectedDifficulty={selectedDifficulty}
      selectedCategory={selectedCategory}
      maxStreak={maxStreak}
      resetGame={resetGame}
      setGameState={setGameState}
    />
  );
  if (gameState === 'scoreboard') return (
    <ScoreboardScreen
      playerName={playerName}
      score={score}
      level={level}
      selectedCategory={selectedCategory}
      selectedDifficulty={selectedDifficulty}
      achievements={achievements}
      resetGame={resetGame}
    />
  );

  return null;
}