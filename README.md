# Roomeet

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. Specify `.env.production` for the desired domain and keys.

2. Run the build command.

```bash
npm run build
```

3. Run `Dockerfile.arm` to create images based on the standalone build version and `.env.production` inside the directory.

```bash
docker buildx build --platform linux/arm64 -t faizbyp/roomeet:x.x.x -f Dockerfile.arm --load .
```

4. Test Locally

```bash
docker run -p 3000:3000 --env-file .env.production faizbyp/roomeet:x.x.x
```

5. Push the image to Docker Hub.

6. Ask the infra team to update the deployment image based on the updated tag on Docker Hub.
