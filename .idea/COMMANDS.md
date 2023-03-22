# Commands 🕸️

&nbsp;

## Docker 🐋

---

### Build a Docker file

```Bash
docker build -t YOURDOCKERID/SERVICENAME .
```

### Push to Dockerhub

```Bash
docker push YOURDOCKERID/SERVICENAME
```

&nbsp;

## Kubernetes 🛞

---

### Start Kubelt with ENVS

```Bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

### Look up Ingress Services

```Bash
kubectl get services -n ingress-nginx
```

### Get Namespaces

```Bash
kubectl get namespace
```

### View running pods

```Bash
kubectl get pods
```

### View running services

```Bash
kubectl get services
```

### Port Forwarding

```Bash
kubectl port-forward <POD_ID> <PORT_IN>:<PORT_OUT>
```

### Deleting a pod

```Bash
kubectl delete <POD_ID>
```

### Creating a secret key

```Bash
kubectl create secret generic <name-of-key> --from-literal <NAME_OF_KEY>=<YOUR_KEY>
```

_View list of secret keys_

```Bash
kubectl get secrets
```

_Remove a secret_

```Bash
kubectl delete secret <name-of-key>
```
