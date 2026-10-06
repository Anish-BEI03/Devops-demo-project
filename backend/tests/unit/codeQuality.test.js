import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '../../');

describe('Code Quality & Architectural Standards', () => {
  it('should maintain required project directory structure', () => {
    const requiredDirs = ['controllers', 'models', 'routes', 'config', 'tests'];
    requiredDirs.forEach(dir => {
      const dirPath = path.join(backendRoot, dir);
      expect(fs.existsSync(dirPath)).toBe(true);
      expect(fs.statSync(dirPath).isDirectory()).toBe(true);
    });
  });

  it('should have valid package.json with required metadata and scripts', () => {
    const pkgPath = path.join(backendRoot, 'package.json');
    expect(fs.existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    expect(pkg.name).toBe('backend');
    expect(pkg.type).toBe('module');
    expect(pkg.scripts).toHaveProperty('test');
    expect(pkg.scripts).toHaveProperty('test:coverage');
  });

  it('should not contain hardcoded production secrets in source code files', () => {
    const sensitivePatterns = [
      /ghp_[A-Za-z0-9]{36}/,
      /-----BEGIN RSA PRIVATE KEY-----/,
      /AKIA[0-9A-Z]{16}/
    ];

    const controllersDir = path.join(backendRoot, 'controllers');
    const controllerFiles = fs.readdirSync(controllersDir).filter(f => f.endsWith('.js'));

    controllerFiles.forEach(file => {
      const content = fs.readFileSync(path.join(controllersDir, file), 'utf8');
      sensitivePatterns.forEach(pattern => {
        expect(pattern.test(content)).toBe(false);
      });
    });
  });

  it('should export necessary route modules', () => {
    const routesDir = path.join(backendRoot, 'routes');
    const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
    expect(routeFiles.length).toBeGreaterThan(0);

    const expectedRoutes = ['userRoute.js', 'foodRoute.js', 'cartRoute.js', 'orderRoute.js'];
    expectedRoutes.forEach(route => {
      expect(routeFiles).toContain(route);
    });
  });
});
