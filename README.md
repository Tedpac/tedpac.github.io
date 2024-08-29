# [My Website!](https://tedpac.xyz) 👨🏻‍💻

## Getting started

1. [Download](https://nodejs.org/en/download) and install **Node.js v20**.

2. Clone the repository:

   ```shell
   git clone https://github.com/Tedpac/tedpac.github.io.git
   ```

3. Navigate to the project directory:

   ```shell
   cd tedpac.github.io
   ```

4. Install the dependencies:

   ```shell
   npm ci
   ```

5. Start the development server:

   ```shell
   npm run start
   ```

6. Navigate to <http://localhost:9000> in a browser.

## Development

### Code formatting and linting

**Prettier** and **Biome** are used for code formatting and linting, respectively. Both are
development dependencies of the project.

### Testing

To test the application, use the development server by running `npm run start`.

### Branch workflow

- The project has `develop` and `main` branches.
- All development changes must be made in `develop`.
- Merge `develop` into `main` when the changes are ready to be deployed.

### Deployment

Pushing the changes that are in the `main` branch will trigger a GitHub Actions workflow to deploy
the changes to GitHub Pages automatically.

## Credits

- [Template](https://bootstrapmade.com/personal-free-resume-bootstrap-template)
- [Background animation](https://www.vantajs.com/?effect=halo)
