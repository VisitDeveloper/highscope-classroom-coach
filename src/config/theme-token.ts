interface ThemeTokens {
    colorPrimary: string;
    colorPrimaryHover: string;
    colorSecondary: string;
    colorSecondaryHover: string;
    colorBgBase: string;
    colorBgContainer: string;
    colorBgElevated: string;
    colorText: string;
    colorTextSecondary: string;
    colorBorder: string;
    colorSuccessBg: string;
    colorWarningBg: string;
    colorDangerBg: string;
    colorInfoBg: string;
    colorMenuBg: string;
    colorMenuItemColor: string;
    colorMenuItemSelectedBg: string;
    colorMenuItemSelectedText: string;
    colorMenuItemHoverBg: string;
    colorBgHeader: string;
    fontSize: number;
    fontSizeSM: number;
    fontSizeLG: number;
    fontSizeHeading1: number;
    fontSizeHeading2: number;
    fontSizeHeading3: number;
    borderRadius?: number;
    borderRadiusSM?: number;
    borderRadiusLG?: number;
    borderRadiusXS?: number;
    borderRadiusCircle?: number;
    colorModalBorder?: string;

    // colorLink?: string;

}

// Light theme tokens
export const lightTokens: ThemeTokens = {
    colorPrimary: '#00A86B',
    colorPrimaryHover: '#00915D',
    colorSecondary: '#FFFFFF',
    colorSecondaryHover: '#E6F8F1',
    colorBgBase: '#F8FAF9',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorText: '#1B1C1C',
    colorTextSecondary: '#4A4D4D',
    colorBorder: '#00A86B',
    colorSuccessBg: '#E6F8F1',
    colorWarningBg: '#FFF4E5',
    colorDangerBg: '#FFE6E6',
    colorInfoBg: '#E6F7FF',
    colorMenuBg: '#FFFFFF',
    colorMenuItemColor: '#1B1C1C',
    colorMenuItemSelectedBg: '#00915D',
    colorMenuItemSelectedText: '#fff',
    colorMenuItemHoverBg: '#00A86B',
    colorBgHeader: '#FFFFFF',
    colorModalBorder: '#1B1C1C',

    // colorLink: '#1677ff',  // رنگ آبی همیشگی
    // colorLinkHover: '#4096ff',
    // colorLinkActive: '#0958d9',

    fontSize: 16,                       // متن بدنه
    fontSizeSM: 14,                     // متن کوچک (labels, captions)
    fontSizeLG: 20,                     // headings کوچک تا متوسط
    fontSizeHeading1: 24,               // H1
    fontSizeHeading2: 22,               // H2
    fontSizeHeading3: 20,               // H3


    borderRadius: 8,        // گوشه پیش‌فرض
    borderRadiusSM: 4,      // گوشه کوچک
    borderRadiusLG: 12,     // گوشه بزرگ
    borderRadiusXS: 2,      // گوشه خیلی کوچک
    borderRadiusCircle: 999,

};

// Dark theme tokens
export const darkTokens: ThemeTokens = {
    colorPrimary: '#00D38A',
    colorPrimaryHover: '#00B375',
    colorSecondary: '#1F2422',
    colorSecondaryHover: '#0C2E23',
    colorBgBase: '#0F1211',
    colorBgContainer: '#171B19',
    colorBgElevated: '#1F2422',
    colorText: '#F2F2F2',
    colorTextSecondary: '#A6A8A7',
    colorBorder: '#00D38A',
    colorSuccessBg: '#0C2E23',
    colorWarningBg: '#2E2410',
    colorDangerBg: '#2E0F0F',
    colorInfoBg: '#0F1F2E',
    colorMenuBg: '#171B19',
    colorMenuItemColor: '#F2F2F2',
    colorMenuItemSelectedBg: '#00B375',
    colorMenuItemSelectedText: '#fff',
    colorMenuItemHoverBg: '#00D38A',
    colorBgHeader: '#171B19',

    colorModalBorder: '#fff',


    fontSize: 16,
    fontSizeSM: 14,
    fontSizeLG: 20,
    fontSizeHeading1: 24,
    fontSizeHeading2: 22,
    fontSizeHeading3: 20,

    borderRadius: 8,        // گوشه پیش‌فرض
    borderRadiusSM: 4,      // گوشه کوچک
    borderRadiusLG: 12,     // گوشه بزرگ
    borderRadiusXS: 2,      // گوشه خیلی کوچک
    borderRadiusCircle: 999,


};
