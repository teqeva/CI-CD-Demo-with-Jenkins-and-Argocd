pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = "${DOCKERHUB_CREDENTIALS_USR}/week10-cicd-jenkins-argocd"
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "https://github.com/YOUR-USERNAME/week10-cicd-jenkins-argocd", branch: "main"
            }
        }

        stage('Install') {
            tools {
                nodejs 'node'
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            tools {
                nodejs 'node'
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Docker Push') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker push ${IMAGE_NAME}:latest"
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                sh 'trivy fs . --severity HIGH,CRITICAL --exit-code 0 --timeout 15m'
            }
        }
    }

    post {
        success {
            echo "Build #${env.BUILD_NUMBER} succeeded. View details: ${env.BUILD_URL}"
        }
        failure {
            echo "Build #${env.BUILD_NUMBER} failed. Check logs: ${env.BUILD_URL}console"
        }
    }
}