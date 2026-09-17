/**
 * WhosOnScreen – TMDB API Client
 *
 * Wraps The Movie Database API v3 for:
 *  - Searching titles (movie or TV) by name
 *  - Fetching credits (cast, guest stars, child actors)
 *  - Fetching episode-specific cast when season/episode is detected
 *  - Fetching detailed actor profiles (bio, age, birth place, filmography)
 *  - Fallback demo data with child actors & episode leads!
 */

import { Cache } from './cache.js';

const DEFAULT_KEY = '';
const BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';
const persistentCache = new Cache();

// Curated demo cast database including child actors & episode roles
const DEMO_TITLES = {
  'the night manager': {
    title: 'The Night Manager',
    type: 'tv',
    cast: [
      {
        id: 1111,
        name: 'Aditya Roy Kapur',
        character: 'Shaan Sengupta / The Night Manager',
        profileUrl: 'https://image.tmdb.org/t/p/w185/8dKqL8e0kK5jW7L7kO5d8p8dK.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/8dKqL8e0kK5jW7L7kO5d8p8dK.jpg',
        knownFor: 'Aashiqui 2, Yeh Jawaani Hai Deewani, Malang',
      },
      {
        id: 1112,
        name: 'Anil Kapoor',
        character: 'Shailendra Rungta / Shelly',
        profileUrl: 'https://image.tmdb.org/t/p/w185/7hBvj0H0jG8n8zV6sK2k3.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/7hBvj0H0jG8n8zV6sK2k3.jpg',
        knownFor: 'Slumdog Millionaire, 24, Dil Dhadakne Do',
      },
      {
        id: 1113,
        name: 'Sobhita Dhulipala',
        character: 'Kaveri Dixit',
        profileUrl: 'https://image.tmdb.org/t/p/w185/rK2qL4e9kL5jW7L7kO5d.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/rK2qL4e9kL5jW7L7kO5d.jpg',
        knownFor: 'Made in Heaven, Monkey Man, Raman Raghav 2.0',
      },
      {
        id: 1116,
        name: 'Tirth Sharma',
        character: 'Taha / Young Shaan (Child)',
        profileUrl: null,
        knownFor: 'Secret Superstar, The Night Manager',
        isChildActor: true,
        tag: 'Child Actor',
      },
      {
        id: 1114,
        name: 'Tillotama Shome',
        character: 'Lipika Saikia Rao',
        profileUrl: 'https://image.tmdb.org/t/p/w185/tK2qL4e9kL5jW7L7kO5d.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/tK2qL4e9kL5jW7L7kO5d.jpg',
        knownFor: 'Sir, Monsoon Wedding, Lust Stories 2',
      },
      {
        id: 1115,
        name: 'Saswata Chatterjee',
        character: 'Brij Pal / BJ',
        profileUrl: null,
        knownFor: 'Kahaani, Jagga Jasoos, Project K',
      },
    ],
  },
  'shogun': {
    title: 'Shōgun',
    type: 'tv',
    cast: [
      {
        id: 2221,
        name: 'Hiroyuki Sanada',
        character: 'Lord Yoshii Toranaga',
        profileUrl: 'https://image.tmdb.org/t/p/w185/4Hj2w3p9L2s9w2x9.jpg',
        knownFor: 'The Last Samurai, John Wick 4, Bullet Train',
      },
      {
        id: 2222,
        name: 'Cosmo Jarvis',
        character: 'John Blackthorne / Anjin',
        profileUrl: null,
        knownFor: 'Lady Macbeth, Peaky Blinders, Persuasion',
      },
      {
        id: 2223,
        name: 'Anna Sawai',
        character: 'Toda Mariko',
        profileUrl: null,
        knownFor: 'Monarch: Legacy of Monsters, F9, Giri/Haji',
      },
      {
        id: 2225,
        name: 'Senan Jennings',
        character: 'Young John Blackthorne (Child)',
        profileUrl: null,
        knownFor: 'Vivarium, Shōgun',
        isChildActor: true,
        tag: 'Child Actor',
      },
      {
        id: 2224,
        name: 'Tadanobu Asano',
        character: 'Kashigi Yabushige',
        profileUrl: null,
        knownFor: 'Thor: Ragnarok, Mortal Kombat, Ichi the Killer',
      },
    ],
  },
  'aarya': {
    title: 'Aarya',
    type: 'tv',
    cast: [
      {
        id: 3331,
        name: 'Sushmita Sen',
        character: 'Aarya Sareen',
        profileUrl: null,
        knownFor: 'Main Hoon Na, Sam Bahadur, Aankhen',
      },
      {
        id: 3334,
        name: 'Viren Vazirani',
        character: 'Veer Sareen (Son)',
        profileUrl: null,
        knownFor: 'Aarya, Super 30',
        isChildActor: true,
        tag: 'Teen / Child',
      },
      {
        id: 3335,
        name: 'Pratham Mehta',
        character: 'Adi Sareen (Youngest Son)',
        profileUrl: null,
        knownFor: 'Aarya',
        isChildActor: true,
        tag: 'Child Actor',
      },
      {
        id: 3332,
        name: 'Sikandar Kher',
        character: 'Daulat',
        profileUrl: null,
        knownFor: 'Monkey Man, Monica O My Darling, Tooth Pari',
      },
    ],
  },
  'brahmastra': {
    title: 'Brahmāstra: Part One – Shiva',
    type: 'movie',
    cast: [
      {
        id: 4441,
        name: 'Ranbir Kapoor',
        character: 'Shiva',
        profileUrl: 'https://image.tmdb.org/t/p/w185/d8thC0CgD3rJ10Yy.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/d8thC0CgD3rJ10Yy.jpg',
        knownFor: 'Animal, Barfi!, Sanju',
      },
      {
        id: 4442,
        name: 'Alia Bhatt',
        character: 'Isha',
        profileUrl: 'https://image.tmdb.org/t/p/w185/9xY5G.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/9xY5G.jpg',
        knownFor: 'Gangubai Kathiawadi, Raazi, Highway',
      },
      {
        id: 4446,
        name: 'Stuti Dwivedi',
        character: 'Young Isha (Child)',
        profileUrl: null,
        knownFor: 'Brahmāstra: Part One – Shiva',
        isChildActor: true,
        tag: 'Child Actor',
      },
      {
        id: 4443,
        name: 'Amitabh Bachchan',
        character: 'Guru / Raghu',
        profileUrl: null,
        knownFor: 'Sholay, Piku, Black',
      },
    ],
  },
  'panchayat': {
    title: 'Panchayat',
    type: 'tv',
    cast: [
      {
        id: 5551,
        name: 'Jitendra Kumar',
        character: 'Abhishek Tripathi (Sachiv Ji)',
        profileUrl: 'https://image.tmdb.org/t/p/w185/u6q7q.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/u6q7q.jpg',
        knownFor: 'Panchayat, Kota Factory, Shubh Mangal Zyada Saavdhan',
      },
      {
        id: 5552,
        name: 'Neena Gupta',
        character: 'Manju Devi (Pradhan)',
        profileUrl: 'https://image.tmdb.org/t/p/w185/7hBvj.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/7hBvj.jpg',
        knownFor: 'Badhaai Ho, Panchayat, Masaba Masaba',
      },
      {
        id: 5553,
        name: 'Raghubir Yadav',
        character: 'Brij Bhushan Dubey (Pradhan-Pati)',
        profileUrl: null,
        knownFor: 'Lagaan, Panchayat, Newton, Peepli Live',
      },
      {
        id: 5554,
        name: 'Faisal Malik',
        character: 'Prahladcha Pandey (Upa-Pradhan)',
        profileUrl: null,
        knownFor: 'Gangs of Wasseypur, Panchayat',
      },
      {
        id: 5555,
        name: 'Chandan Roy',
        character: 'Vikas (Assistant)',
        profileUrl: null,
        knownFor: 'Panchayat, Gulabo Sitabo',
      },
      {
        id: 5556,
        name: 'Sanvikaa',
        character: 'Rinky',
        profileUrl: null,
        knownFor: 'Panchayat',
      },
    ],
  },
  'mirzapur': {
    title: 'Mirzapur',
    type: 'tv',
    cast: [
      {
        id: 6661,
        name: 'Pankaj Tripathi',
        character: 'Akhandanand Tripathi (Kaleen Bhaiya)',
        profileUrl: 'https://image.tmdb.org/t/p/w185/pankaj.jpg',
        profileUrlLarge: 'https://image.tmdb.org/t/p/h632/pankaj.jpg',
        knownFor: 'Gangs of Wasseypur, Mirzapur, Sacred Games, Stree',
      },
      {
        id: 6662,
        name: 'Ali Fazal',
        character: 'Guddu Pandit',
        profileUrl: null,
        knownFor: 'Mirzapur, Victoria & Abdul, Death on the Nile',
      },
      {
        id: 6663,
        name: 'Divyenndu',
        character: 'Phoolchand "Munna" Tripathi',
        profileUrl: null,
        knownFor: 'Pyaar Ka Punchnama, Mirzapur, Toilet: Ek Prem Katha',
      },
      {
        id: 6664,
        name: 'Shweta Tripathi',
        character: 'Golu Gupta',
        profileUrl: null,
        knownFor: 'Masaan, Mirzapur, Yeh Kaali Kaali Ankhein',
      },
      {
        id: 6665,
        name: 'Rasika Dugal',
        character: 'Beena Tripathi',
        profileUrl: null,
        knownFor: 'Delhi Crime, Mirzapur, Manto',
      },
    ],
  },
};

const DEMO_PERSONS = {
  '1111': {
    id: 1111,
    name: 'Aditya Roy Kapur',
    birthday: '1985-11-16',
    age: 38,
    placeOfBirth: 'Mumbai, Maharashtra, India',
    biography: 'Aditya Roy Kapur is an Indian actor who works in Hindi films. After working as a video jockey on Channel V, he made his film debut with London Dreams (2009) and rose to fame with the musical romance Aashiqui 2 (2013) and the romantic drama Yeh Jawaani Hai Deewani (2013). In 2023, he starred as the lead in the acclaimed thriller series The Night Manager.',
    imdbId: 'nm3656133',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'The Night Manager', role: 'Shaan Sengupta', year: 2023, posterUrl: 'https://image.tmdb.org/t/p/w185/8yP5CshwR7v77HspZlX9gN8mO5.jpg' },
      { title: 'Aashiqui 2', role: 'Rahul Jaykar', year: 2013, posterUrl: 'https://image.tmdb.org/t/p/w185/yLqgLpQYqK2lQ0K2vM8nC8xV9o.jpg' },
      { title: 'Yeh Jawaani Hai Deewani', role: 'Avinash "Avi" Yog', year: 2013, posterUrl: 'https://image.tmdb.org/t/p/w185/8L6e7W6R8mX7rT6M5e0.jpg' },
      { title: 'Malang', role: 'Advait Thakur', year: 2020, posterUrl: 'https://image.tmdb.org/t/p/w185/6oYhW9o9yV7lP8xW7m.jpg' },
    ],
  },
  '1112': {
    id: 1112,
    name: 'Anil Kapoor',
    birthday: '1956-12-24',
    age: 67,
    placeOfBirth: 'Chembur, Mumbai, Maharashtra, India',
    biography: 'Anil Kapoor is an Indian actor and producer who has appeared in over 100 Hindi-language films, as well as international films and television series. In a career spanning over four decades, he has won multiple awards, including two National Film Awards and six Filmfare Awards.',
    imdbId: 'nm0438463',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Slumdog Millionaire', role: 'Prem Kumar', year: 2008, posterUrl: 'https://image.tmdb.org/t/p/w185/5UaK20m8w.jpg' },
      { title: 'The Night Manager', role: 'Shelly Rungta', year: 2023, posterUrl: 'https://image.tmdb.org/t/p/w185/8yP5CshwR7v77HspZlX9gN8mO5.jpg' },
      { title: 'Dil Dhadakne Do', role: 'Kamal Mehra', year: 2015, posterUrl: 'https://image.tmdb.org/t/p/w185/dil.jpg' },
      { title: 'Mission: Impossible - Ghost Protocol', role: 'Brij Nath', year: 2011, posterUrl: 'https://image.tmdb.org/t/p/w185/mi4.jpg' },
    ],
  },
  '1113': {
    id: 1113,
    name: 'Sobhita Dhulipala',
    birthday: '1992-05-31',
    age: 32,
    placeOfBirth: 'Tenali, Andhra Pradesh, India',
    biography: 'Sobhita Dhulipala is an Indian actress who predominantly works in Hindi, Malayalam, and Telugu films. She made her acting debut in Anurag Kashyap\'s thriller Raman Raghav 2.0 (2016) and gained wide critical acclaim for her starring role as Tara Khanna in the drama series Made in Heaven.',
    imdbId: 'nm7414983',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Made in Heaven', role: 'Tara Khanna', year: 2019, posterUrl: 'https://image.tmdb.org/t/p/w185/mih.jpg' },
      { title: 'The Night Manager', role: 'Kaveri Dixit', year: 2023, posterUrl: 'https://image.tmdb.org/t/p/w185/8yP5CshwR7v77HspZlX9gN8mO5.jpg' },
      { title: 'Monkey Man', role: 'Sita', year: 2024, posterUrl: 'https://image.tmdb.org/t/p/w185/monkey.jpg' },
      { title: 'Ponniyin Selvan: I', role: 'Vaanathi', year: 2022, posterUrl: 'https://image.tmdb.org/t/p/w185/ps1.jpg' },
    ],
  },
  '1116': {
    id: 1116,
    name: 'Tirth Sharma',
    birthday: '2004-03-12',
    age: 19,
    placeOfBirth: 'Vadodara, Gujarat, India',
    biography: 'Tirth Sharma is an Indian child and teen actor who gained widespread recognition playing Chintan Parekh in the critically acclaimed film Secret Superstar (2017). He plays Taha / Young Shaan in Disney+ Hotstar\'s The Night Manager.',
    imdbId: 'nm9389278',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Secret Superstar', role: 'Chintan Parekh', year: 2017, posterUrl: 'https://image.tmdb.org/t/p/w185/8yP5C.jpg' },
      { title: 'The Night Manager', role: 'Taha', year: 2023, posterUrl: 'https://image.tmdb.org/t/p/w185/8yP5CshwR7v77HspZlX9gN8mO5.jpg' },
    ],
  },
  '5551': {
    id: 5551,
    name: 'Jitendra Kumar',
    birthday: '1990-09-01',
    age: 34,
    placeOfBirth: 'Khairthal, Alwar, Rajasthan, India',
    biography: 'Jitendra Kumar is an Indian actor known for his work in Hindi web series and films. Famous for his roles as Jeetu Bhaiya in Kota Factory and Abhishek Tripathi in Panchayat, he is an alumnus of IIT Kharagpur who became a pioneering star in digital Indian storytelling.',
    imdbId: 'nm6925586',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Panchayat', role: 'Abhishek Tripathi', year: 2020, posterUrl: 'https://image.tmdb.org/t/p/w185/panchayat.jpg' },
      { title: 'Kota Factory', role: 'Jeetu Bhaiya', year: 2019, posterUrl: 'https://image.tmdb.org/t/p/w185/kota.jpg' },
      { title: 'Shubh Mangal Zyada Saavdhan', role: 'Aman Tripathi', year: 2020, posterUrl: 'https://image.tmdb.org/t/p/w185/smzs.jpg' },
      { title: 'Jaadugar', role: 'Meenu Narang', year: 2022, posterUrl: 'https://image.tmdb.org/t/p/w185/jaadugar.jpg' },
    ],
  },
  '5552': {
    id: 5552,
    name: 'Neena Gupta',
    birthday: '1959-06-04',
    age: 65,
    placeOfBirth: 'Delhi, India',
    biography: 'Neena Gupta is an Indian actress and television director. Primarily working in Hindi films and television, she has received several accolades, including three National Film Awards and a Filmfare Award, acclaimed for her roles in Badhaai Ho, Panchayat, and Woh Chokri.',
    imdbId: 'nm0348366',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Badhaai Ho', role: 'Priyamvada Kaushik', year: 2018, posterUrl: 'https://image.tmdb.org/t/p/w185/badhaai.jpg' },
      { title: 'Panchayat', role: 'Manju Devi', year: 2020, posterUrl: 'https://image.tmdb.org/t/p/w185/panchayat.jpg' },
      { title: 'Masaba Masaba', role: 'Herself', year: 2020, posterUrl: 'https://image.tmdb.org/t/p/w185/masaba.jpg' },
      { title: 'Uunchai', role: 'Shabina Siddiqui', year: 2022, posterUrl: 'https://image.tmdb.org/t/p/w185/uunchai.jpg' },
    ],
  },
  '6661': {
    id: 6661,
    name: 'Pankaj Tripathi',
    birthday: '1976-09-05',
    age: 48,
    placeOfBirth: 'Belsand, Gopalganj, Bihar, India',
    biography: 'Pankaj Tripathi is one of the most celebrated and naturalistic actors in Indian cinema. An alumnus of the National School of Drama, he rose to prominence with Gangs of Wasseypur and earned massive acclaim as Akhandanand "Kaleen Bhaiya" Tripathi in Mirzapur, Guruji in Sacred Games, and Madhav Mishra in Criminal Justice.',
    imdbId: 'nm3503254',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Mirzapur', role: 'Kaleen Bhaiya', year: 2018, posterUrl: 'https://image.tmdb.org/t/p/w185/mirzapur.jpg' },
      { title: 'Sacred Games', role: 'Guruji', year: 2018, posterUrl: 'https://image.tmdb.org/t/p/w185/sacred.jpg' },
      { title: 'Stree', role: 'Rudra', year: 2018, posterUrl: 'https://image.tmdb.org/t/p/w185/stree.jpg' },
      { title: 'Gangs of Wasseypur', role: 'Sultan Qureshi', year: 2012, posterUrl: 'https://image.tmdb.org/t/p/w185/gow.jpg' },
    ],
  },
  '4441': {
    id: 4441,
    name: 'Ranbir Kapoor',
    birthday: '1982-09-28',
    age: 41,
    placeOfBirth: 'Mumbai, Maharashtra, India',
    biography: 'Ranbir Kapoor is an acclaimed Indian actor known for his versatile performances in Hindi cinema. Recipient of six Filmfare Awards, he is one of the highest-paid actors in India, known for Animal, Barfi!, Rockstar, Sanju, Yeh Jawaani Hai Deewani, and Brahmāstra.',
    imdbId: 'nm2683584',
    knownForDepartment: 'Acting',
    credits: [
      { title: 'Animal', role: 'Ranvijay Singh', year: 2023, posterUrl: 'https://image.tmdb.org/t/p/w185/animal.jpg' },
      { title: 'Brahmāstra: Part One', role: 'Shiva', year: 2022, posterUrl: 'https://image.tmdb.org/t/p/w185/brahm.jpg' },
      { title: 'Sanju', role: 'Sanjay Dutt', year: 2018, posterUrl: 'https://image.tmdb.org/t/p/w185/sanju.jpg' },
      { title: 'Rockstar', role: 'Janardhan Jakhar / Jordan', year: 2011, posterUrl: 'https://image.tmdb.org/t/p/w185/rockstar.jpg' },
    ],
  },
};

export class TMDBClient {
  constructor() {
    this._titleCache = new Map();
    this._personCache = new Map();
    this._cachedKey = null;
  }

  async getApiKey() {
    if (this._cachedKey) return this._cachedKey;
    try {
      const data = await chrome.storage.local.get(['tmdbApiKey']);
      if (data?.tmdbApiKey) {
        this._cachedKey = data.tmdbApiKey.trim();
        return this._cachedKey;
      }
    } catch (_) {}
    return DEFAULT_KEY;
  }

  async setApiKey(key) {
    const cleaned = (key || '').trim();
    this._cachedKey = cleaned;
    await chrome.storage.local.set({ tmdbApiKey: cleaned });
    return true;
  }

  async needsApiKey() {
    const key = await this.getApiKey();
    return !key || key === 'YOUR_TMDB_API_KEY';
  }

  /**
   * Search for a title and return its cast, including episode-specific and child actors.
   */
  async getCastForTitle(title, year, type, season = null, episode = null) {
    if (!title) return null;

    const normalized = title.trim();
    const cacheKey = `${normalized.toLowerCase()}|${year || ''}|${type || ''}|${season || ''}|${episode || ''}`;
    if (this._titleCache.has(cacheKey)) {
      return this._titleCache.get(cacheKey);
    }

    try {
      const persisted = await persistentCache.get('cast_' + cacheKey);
      if (persisted) {
        this._titleCache.set(cacheKey, persisted);
        return persisted;
      }
    } catch (_) {}

    const key = await this.getApiKey();
    if (!key || key === 'YOUR_TMDB_API_KEY') {
      const demo = this._matchDemoTitle(normalized);
      if (demo) {
        this._titleCache.set(cacheKey, demo);
        return demo;
      }
      return null;
    }

    try {
      const result = await this._searchTitle(normalized, year, type, key);
      if (!result) {
        return this._matchDemoTitle(normalized);
      }

      let castList = [];

      // If TV show and specific season/episode detected, fetch episode credits!
      if (result.media_type === 'tv' && season && episode) {
        try {
          const epCredits = await this._get(
            `/tv/${result.id}/season/${season}/episode/${episode}/credits`,
            {},
            key
          );
          castList = [
            ...(epCredits.cast || []),
            ...(epCredits.guest_stars || []),
          ];
        } catch (err) {
          console.warn('[wos] Episode credits failed, falling back to show credits:', err);
        }
      }

      // Fallback to series/movie credits if episode credits empty
      if (castList.length === 0) {
        const credits = await this._fetchCredits(result.id, result.media_type, key);
        castList = credits.cast || [];
      }

      const cast = castList.slice(0, 35).map((person) => {
        const character = person.character || person.roles?.[0]?.character || '';
        const isChild = isChildRole(character);
        return {
          id: person.id,
          name: person.name,
          character,
          profilePath: person.profile_path,
          profileUrl: person.profile_path
            ? `${IMG_BASE}/w185${person.profile_path}`
            : null,
          profileUrlLarge: person.profile_path
            ? `${IMG_BASE}/h632${person.profile_path}`
            : null,
          order: person.order ?? 999,
          knownFor: '',
          isChildActor: isChild,
          tag: isChild ? (character.toLowerCase().includes('young') ? 'Young' : 'Child Actor') : null,
        };
      });

      // Enrich top actors with known-for titles
      await Promise.allSettled(
        cast.slice(0, 5).map(async (person) => {
          person.knownFor = await this.getKnownFor(person.id, key);
        })
      );

      const data = {
        title: result.title || result.name || normalized,
        id: result.id,
        type: result.media_type,
        cast,
      };

      this._titleCache.set(cacheKey, data);
      persistentCache.set('cast_' + cacheKey, data).catch(() => {});
      return data;
    } catch (err) {
      console.warn('[wos] TMDB API error, attempting demo fallback:', err.message);
      return this._matchDemoTitle(normalized);
    }
  }

  async getPersonDetails(personId, personName) {
    const idStr = String(personId || '');
    if (this._personCache.has(idStr)) {
      return this._personCache.get(idStr);
    }

    try {
      const persisted = await persistentCache.get('person_' + idStr);
      if (persisted) {
        this._personCache.set(idStr, persisted);
        return persisted;
      }
    } catch (_) {}

    if (DEMO_PERSONS[idStr]) {
      const demoPerson = JSON.parse(JSON.stringify(DEMO_PERSONS[idStr]));
      this._personCache.set(idStr, demoPerson);
      return demoPerson;
    }

    const key = await this.getApiKey();
    if (!key || key === 'YOUR_TMDB_API_KEY') {
      return this._createFallbackPerson(personId, personName);
    }

    try {
      const [person, creditsData] = await Promise.all([
        this._get(`/person/${personId}`, {}, key),
        this._get(`/person/${personId}/combined_credits`, {}, key).catch(() => ({})),
      ]);

      const birthDate = person.birthday ? new Date(person.birthday) : null;
      let age = null;
      if (birthDate && !isNaN(birthDate.getTime())) {
        const endDate = person.deathday ? new Date(person.deathday) : new Date();
        age = Math.floor((endDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
      }

      const rawCredits = (creditsData.cast || [])
        .filter((c) => c.title || c.name)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 8);

      const credits = rawCredits.map((c) => ({
        id: c.id,
        title: c.title || c.name,
        role: c.character || '',
        year: c.release_date
          ? c.release_date.slice(0, 4)
          : c.first_air_date
          ? c.first_air_date.slice(0, 4)
          : null,
        posterUrl: c.poster_path ? `${IMG_BASE}/w185${c.poster_path}` : null,
      }));

      const details = {
        id: person.id,
        name: person.name,
        biography: person.biography || '',
        birthday: person.birthday || null,
        deathday: person.deathday || null,
        age,
        placeOfBirth: person.place_of_birth || null,
        imdbId: person.imdb_id || null,
        profileUrlLarge: person.profile_path
          ? `${IMG_BASE}/h632${person.profile_path}`
          : null,
        profileUrl: person.profile_path
          ? `${IMG_BASE}/w185${person.profile_path}`
          : null,
        knownForDepartment: person.known_for_department || 'Acting',
        credits,
      };

      this._personCache.set(idStr, details);
      persistentCache.set('person_' + idStr, details).catch(() => {});
      return details;
    } catch (err) {
      console.warn('[wos] Failed to fetch person details:', err);
      return this._createFallbackPerson(personId, personName);
    }
  }

  async getKnownFor(personId, key) {
    try {
      const apiKey = key || (await this.getApiKey());
      if (!apiKey || apiKey === 'YOUR_TMDB_API_KEY') return '';

      const data = await this._get(`/person/${personId}/combined_credits`, {}, apiKey);
      const top = (data.cast || [])
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 3)
        .map((c) => c.title || c.name)
        .filter(Boolean);
      return top.join(', ');
    } catch {
      return '';
    }
  }

  _createFallbackPerson(personId, personName) {
    return {
      id: personId,
      name: personName || 'Actor',
      biography: `${personName || 'This actor'} is part of the cast.`,
      birthday: null,
      deathday: null,
      age: null,
      placeOfBirth: null,
      imdbId: null,
      profileUrl: null,
      profileUrlLarge: null,
      credits: [],
    };
  }

  _matchDemoTitle(rawTitle) {
    const lower = rawTitle.toLowerCase();
    for (const [k, v] of Object.entries(DEMO_TITLES)) {
      if (lower.includes(k) || k.includes(lower)) {
        return JSON.parse(JSON.stringify(v));
      }
    }
    return null;
  }

  async _searchTitle(query, year, type, apiKey) {
    if (type === 'movie' || type === 'tv') {
      const data = await this._get(
        `/search/${type}`,
        { query, ...(year ? { year } : {}) },
        apiKey
      );
      const result = data.results?.[0];
      if (result) {
        result.media_type = type;
        return result;
      }
    }

    const data = await this._get('/search/multi', { query }, apiKey);
    return (
      data.results?.find((r) => r.media_type === 'movie' || r.media_type === 'tv') ||
      null
    );
  }

  async _fetchCredits(titleId, type, apiKey) {
    const endpoint =
      type === 'tv'
        ? `/tv/${titleId}/aggregate_credits`
        : `/movie/${titleId}/credits`;
    return this._get(endpoint, {}, apiKey);
  }

  async _get(path, params = {}, apiKey) {
    const url = new URL(`${BASE}${path}`);
    url.searchParams.set('api_key', apiKey);
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`TMDB HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  }
}

function isChildRole(character) {
  if (!character) return false;
  return /(?:young|child|kid|baby|boy|girl|\(age|\bteen\b|junior|jr\.)/i.test(character);
}
