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
                git url: "https://github.com/teqeva/CI-CD-Demo-with-Jenkins-and-Argocd", branch: "main"
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
                sh 'trivy fs . --severity HIGH,CRITICAL --exit-code 0 --timeout 20m'
            }
        }
    }

    post {
        success {
            emailext(
                subject: "SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: "Build successful! View details: ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
        failure {
            emailext(
                subject: "FAILED: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: "Build failed! Check logs: ${env.BUILD_URL}console",
                to: 'team@example.com'
            )
        }
    }
}