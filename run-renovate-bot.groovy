node {
  ansiColor('xterm') {
    withCredentials([string(credentialsId: 'bitbucket-api.token', variable: 'BITBUCKET_TOKEN'), string(credentialsId: 'github-com-token', variable: 'GITHUB_COM_TOKEN')]) {
      stage('checkout scm') {
        git branch: "master", credentialsId: 'hash', url: 'https://self.hosted.bitbucket.com/bitbucket/scm/cg_fe/repo.git'
      }

      stage("run renovate bot") {
        sh "docker run --rm -v ${WORKSPACE}/renovate.config.js:/usr/src/app/config.js -e GITHUB_COM_TOKEN=$GITHUB_COM_TOKEN renovate/renovate --password $BITBUCKET_TOKEN"
      }
    }
  }
}
