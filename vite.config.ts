import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            /%VITE_KAKAO_MAP_KEY%/g,
            env.VITE_KAKAO_MAP_KEY || ''
          );
        },
      },
    ],
    server: {
      proxy: {
        // '/api'로 시작하는 요청을 공공데이터 서버로 전송
        '/api-pool': {
          target: 'https://apis.data.go.kr',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-pool/, ''),
          secure: false,
        }
      }
    }
  }
})
