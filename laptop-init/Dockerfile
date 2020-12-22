FROM ubuntu:20.04

# Labels.
LABEL maintainer="will@willhallonline.co.uk" 

RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    apt-get install -y gnupg2 python3-pip sshpass git openssh-client vim && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean
    
RUN python3 -m pip install --upgrade pip cffi && \
    pip install ansible==2.9.15 && \
    pip install mitogen ansible-lint jmespath && \
    pip install --upgrade pywinrm

RUN mkdir /ansible && \
    mkdir -p /etc/ansible

WORKDIR /ansible

CMD [ "ansible-playbook", "--version" ]


