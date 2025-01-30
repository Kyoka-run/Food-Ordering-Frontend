/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#FF5A1F',    // 温暖的橙色作为主色调
          light: '#FF8C62',
          dark: '#DE3A00',
          DEFAULT: '#FF5A1F',
        },
        secondary: {
          main: '#38A169',    // 清新的绿色作为次要色调
          light: '#68D391',
          dark: '#276749',
          DEFAULT: '#38A169',
        },
        // 状态颜色
        status: {
          success: '#38A169',  // 绿色 - 订单完成、送达
          warning: '#F6AD55',  // 橙色 - 配送中
          error: '#E53E3E',    // 红色 - 订单取消、异常
          info: '#4299E1',     // 蓝色 - 订单信息
          pending: '#805AD5',  // 紫色 - 待处理
        },
        // 中性色
        neutral: {
          lightest: '#F7FAFC',
          lighter: '#EDF2F7',
          light: '#E2E8F0',
          main: '#A0AEC0',
          dark: '#4A5568',
          darker: '#2D3748',
          darkest: '#1A202C',
        },
        // 背景色
        background: {
          default: '#F7FAFC',  // 略微灰白的背景色
          paper: '#FFFFFF',    // 纯白的卡片背景
          menu: '#FFFAF0',     // 暖色的菜单背景
        },
        // 文本颜色
        text: {
          primary: '#2D3748',   // 主要文字颜色
          secondary: '#4A5568', // 次要文字颜色
          light: '#718096',     // 浅色文字
          price: '#E53E3E',     // 价格文字颜色
          rating: '#F6E05E',    // 评分文字颜色
        },
        // 装饰色
        accent: {
          yellow: '#F6E05E',    // 评分、推荐
          pink: '#FEB2B2',      // 优惠、促销
          purple: '#B794F4',    // VIP、特权
          teal: '#4FD1C5',      // 健康、轻食
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      // 增加食品相关的阴影效果
      boxShadow: {
        'card': '0 2px 4px rgba(0,0,0,0.1)',
        'hover': '0 8px 16px rgba(255,90,31,0.1)',
        'menu': '0 4px 6px rgba(0,0,0,0.05)',
      },
      // 圆角设置
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}