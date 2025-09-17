// deploy.js
import { execSync } from "child_process";

const NAME = "kubernetes-demo-api";
const USERR = "robertbagwell0614";
const IMAGE = `${USERR}/${NAME}:latest`;

function run(command, description) {
  try {
    if (description) console.log(`\n👉 ${description}`);
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.error(`❌ Failed: ${description || command}`);
    process.exit(1);
  }
}

console.log("🚀 Starting deployment...");

run(`docker build -t ${IMAGE} .`, "Building Docker image...");
run(`docker push ${IMAGE}`, "Pushing Docker image to Docker Hub...");
run(`kubectl apply -f k8s/deployment.yaml`, "Applying Kubernetes deployment...");
run(`kubectl apply -f k8s/service.yaml`, "Applying Kubernetes service...");
run(`kubectl get pods`, "Getting pods...");
run(`kubectl get services`, "Getting services...");
run(`kubectl get services ${NAME}`, "Fetching the main service...");

console.log("\n✅ Deployment completed successfully.");
// minikube service {service-name}