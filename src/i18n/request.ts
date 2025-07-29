import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import fs from 'fs';
import path from 'path';
export const loadLocaleMessages = (locale: string) => {
  const messagesDir = path.join(process.cwd(), "messages", locale);
  console.log("🔍 Looking for messages in:", messagesDir);

  if (!fs.existsSync(messagesDir)) {
    console.error(`❌ Directory does not exist: ${messagesDir}`);
    return {};
  }

  let messages = {};

  try {
    const files = fs.readdirSync(messagesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    if (jsonFiles.length === 0) {
      return {};
    }
    for (const file of jsonFiles) {
      const filePath = path.join(messagesDir, file);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const fileMessages = JSON.parse(fileContent);

        messages = { ...messages, ...fileMessages };
      } catch (error) {
        console.error(`❌ Failed to parse ${file}:`, error);
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory:`, error);
  }

  return messages;
};


export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }


  const messages = await loadLocaleMessages(locale);

  return {
    locale,
    messages,
  };
})