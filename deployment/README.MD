# Deploying this application

This Site uses Kubernetes to host the application. You can run it in any cloud kubernetes host with a little configuration by following these instructions.   
This is not a comprehensive instructional.

## Software you need and will need to be familiar with
* Kubernetes
* Helm
* Docker Compose

## Dev Environment Setup
Follow all the instructions for getting your development environment for each tool.  
You can then `docker-compose up` in the src directory

## Container Registry
Currently all images are hosted in Google container registry, although the plan is to host our own container registry in the cluster. Then add a continuious deployment tool to automatically upgrade when commits take place.

Go to the src folder and you will find instructions as to how to tag and build  

## GCloud Setup  
`gcloud config set project philo-230001 `  
`gcloud container clusters get-credentials philo-infrastructure --zone=us-west1-b`  

## Kubernetes Setup
Create your cluster and then in your dev machines terminal set your kubernetes cluster to this cluster.  
   
To configure Kubernetes, you need to set up helm by installing tiller.  
`helm init`  
`kubectl create serviceaccount --namespace kube-system tiller`  

`kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller`  

`kubectl patch deploy --namespace kube-system tiller-deploy -p '{\"spec\":{\"template\":{\"spec\":{\"serviceAccount\":\"tiller\"}}}}'`  

### Load Balancer
Traefik is used as the ingress load balancer. Traefik has lots of nice functionality like automated LetsEncrypt certificates.

Install  
`helm install stable/traefik --name traefik-ingress --namespace kube-system -f ./traefik_values.yaml`  
Upgrade  
`helm upgrade -f ./traefik_values.yaml traefik-ingress stable/traefik --namespace kube-system`

```
kubectl create serviceaccount --namespace kube-system traefik  
kubectl create clusterrolebinding traefik-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:traefik  
kubectl patch deploy --namespace kube-system traefik-ingress -p '{\"spec\":{\"template\":{\"spec\":{\"serviceAccount\":\"traefik\"}}}}'  
```

### Fuel Project Site Chart
This chart installs the application to the cluster  
```
helm install --name bigfoot-calculator-prod bigfoot-calculator -f ./values.yaml --namespace=bigfoot-calculator
helm upgrade -f ./values.yaml bigfoot-calculator-prod  bigfoot-calculator --namespace=bigfoot-calculator
```
