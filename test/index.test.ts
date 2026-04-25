import { describe, expect, test } from 'vitest';
import handlebarsPlugin from '../src';

describe('handlebarsPlugin', () => {
  test('should return the plugin name', () => {
    const plugin = handlebarsPlugin({ partialsDirectoryPath: '' });
    expect(plugin.name).toEqual('@cpulvermacher/vite-plugin-handlebars');
  });
});
