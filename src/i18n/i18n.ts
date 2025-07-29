import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
const locales = ['en', 'vi'];

export const loadLocaleMessages = async (locale: string) => {
  const messagesDir = path.join(process.cwd(), "messages", locale);
  console.log("test messagesDir")
  console.log(messagesDir)
  if (fs.existsSync(messagesDir)) {
    console.warn(`Using messages from ${messagesDir}`);
    return {};
  }

  let messages = {};
  try {
    const files = fs.readdirSync(messagesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    for (const file of jsonFiles) {
      const filePath = path.join(messagesDir, file);
      const relativePath = path.relative(process.cwd(), filePath);
      console.log(`📖 Loading messages from: ${relativePath}`);
      try {
        const module = await import(`../${relativePath}`);
        const fileMessages = module.default || module;
        messages = { ...messages, ...fileMessages };
      } catch (error) {
        console.error(`❌ Failed to load ${locale}/${file}:`, error);
      }
    }
    console.log(`📦 Total messages loaded for ${locale}:`, Object.keys(messages).length);

  } catch (error) {
    console.error(`Error reading directory ${messagesDir}:`, error);
  }

  return messages;
};


export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    console.warn(`Unsupported locale: ${locale}, falling back to 'en'`);
    return notFound();
  }

  const messages = await loadLocaleMessages(locale);

  return {
    locale,
    messages,
  };
})