// tests/skills.test.js
import { calculateYearsOfExperience, formatYears } from '../assets/js/skills';

describe('Skills Experience Calculator', () => {
    // Mock current date to make tests deterministic
    const NOW = new Date('2024-03-15');
    const ORIGINAL_DATE = Date;

    beforeAll(() => {
        global.Date = class extends Date {
            constructor(date) {
                if (date) {
                    return super(date);
                }
                return NOW;
            }
        };
    });

    afterAll(() => {
        global.Date = ORIGINAL_DATE;
    });

    const mockExperience = [
        {
            company: 'Company A',
            date: 'Jan 2020 - Dec 2022',
            achievements: [
                'Led development using React and TypeScript',
                'Implemented CI/CD pipelines'
            ]
        },
        {
            company: 'Company B',
            date: 'Jan 2023 - Present',
            achievements: [
                'Built microservices using React and Node.js',
                'Managed AWS infrastructure'
            ]
        }
    ];

    test('calculates years correctly for present dates', () => {
        const years = calculateYearsOfExperience(mockExperience, 'React');
        expect(years).toBe(5); // 2020-2024 (5 unique years)
    });

    test('calculates years correctly for specific date ranges', () => {
        const experience = [{
            company: 'Company A',
            date: 'Jan 2020 - Dec 2022',
            achievements: ['Used Python for data analysis']
        }];
        const years = calculateYearsOfExperience(experience, 'Python');
        expect(years).toBe(3); // 2020-2022 (3 unique years)
    });

    test('handles case-insensitive skill matching', () => {
        const years = calculateYearsOfExperience(mockExperience, 'react');
        expect(years).toBe(5); // Same as test one, just different case
    });

    test('returns 0 for skills not found', () => {
        const years = calculateYearsOfExperience(mockExperience, 'Rust');
        expect(years).toBe(0);
    });

    test('handles empty or invalid inputs', () => {
        expect(calculateYearsOfExperience(null, 'React')).toBe(0);
        expect(calculateYearsOfExperience([], 'React')).toBe(0);
        expect(calculateYearsOfExperience(mockExperience, '')).toBe(0);
        expect(calculateYearsOfExperience(mockExperience, null)).toBe(0);
    });

    describe('formatYears', () => {
        test('formats single year correctly', () => {
            expect(formatYears(1)).toBe('1 year');
        });

        test('formats multiple years correctly', () => {
            expect(formatYears(5)).toBe('5 years');
        });

        test('handles zero years', () => {
            expect(formatYears(0)).toBe('0 years');
        });
    });
});