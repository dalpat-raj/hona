import { Inter, Nunito, Caveat } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
 

export const poppins = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200' ,'300', '400', '500', '700', '800']
})



export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
});