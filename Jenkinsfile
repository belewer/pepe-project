pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: node
            image: node:16-alpine
            command:
            - cat
            tty: true
          - name: docker
            image: docker:latest
            command:
            - cat
            tty: true
            volumeMounts:
             - mountPath: /var/run/docker.sock
               name: docker-sock
          volumes:
          - name: docker-sock
            hostPath:
              path: /var/run/docker.sock    
        '''
    }
  }

  stages {
    stage('Install dependencies') {
      steps {
        container('node') {
          sh 'npm install'
        }
      }
    }

    stage('Audit') {
      steps {
        container('node') {
          sh 'npm audit'
        }
      }
    }

    stage('Lint') {
      steps {
        container('node') {
          sh 'npm run lint'
        }
      }
    }

    stage('Test') {
      steps {
        container('node') {
          sh 'npm run test'
        }
      }
    }

    stage('Build') {
      steps {
        container('docker') {
          sh '''
            apk add jq --no-cache
            export VERSION=$(jq -r .version package.json)
            docker build -t pepe-project:$VERSION .
          '''
        }
      }
    }

    stage('Publish') {
      steps {
        container('docker') {
          sh '''
            docker tag pepe-project:$VERSION jovilon/pepe-project:$VERSION
            docker push jovilon/pepe-project:$VERSION
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        container('node') {
          sh 'npm audit'
        }
      }
    }

  }
}