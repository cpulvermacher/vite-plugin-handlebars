import { describe, expect, test } from 'vitest';
import { Plugin } from 'vite';
import handlebarsPlugin from '../src';

function getFilterRegex(plugin: Plugin): RegExp {
  const transform = plugin.transform as { filter: { id: RegExp } };
  return transform.filter.id;
}

describe('handlebarsPlugin', () => {
  test('should return the plugin name', () => {
    const plugin = handlebarsPlugin({ partialsDirectoryPath: '' });
    expect(plugin.name).toEqual('@cpulvermacher/vite-plugin-handlebars');
  });

  describe('transform filter', () => {
    test('matches default .hbs extension', () => {
      const regex = getFilterRegex(handlebarsPlugin());
      expect(regex.test('/src/template.hbs')).toBe(true);
    });

    test('does not match files where dot is replaced by another character', () => {
      const regex = getFilterRegex(handlebarsPlugin());
      expect(regex.test('/src/templateXhbs')).toBe(false);
    });

    test('matches custom extension with regex special characters', () => {
      const regex = getFilterRegex(handlebarsPlugin({ templateFileExtension: '.h+bs' }));
      expect(regex.test('/src/template.h+bs')).toBe(true);
      expect(regex.test('/src/templateXhXbs')).toBe(false);
    });
  });
});
