pipeline {
    agent any
    
    environment {
        AWS_REGION = 'eu-west-1'
        S3_BUCKET = 'kyoka-food-ordering-system'
        API_URL = 'http://54.171.153.174:8080/api'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        
        // stage('Run Tests') {
        //     steps {
        //         bat 'npm test -- --watchAll=false'
        //     }
        // }
        
        stage('Build React App') {
            steps {
                bat """
                    set "REACT_APP_API_URL=${API_URL}"
                    set "CI=false"
                    npm run build
                """
            }
        }
        
        stage('Deploy to S3') {
            steps {
                withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                    bat "aws s3 sync build/ s3://${env.S3_BUCKET} --delete"
                }
            }
        }
    }
    
    post {
        success {
            echo 'Frontend deployment to S3 successful!'
        }
        failure {
            echo 'Frontend deployment to S3 failed!'
        }
    }
}