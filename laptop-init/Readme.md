https://github.com/willhallonline/docker-ansible/blob/master/README.md
docker run --rm -it edu/ansible:1.0 /bin/sh        																			# 	correr 
docker run --rm -it -v $(pwd)/ansible:/ansible edu/ansible:1.0 /bin/sh 														# 	correr con volumen
docker run --rm -it -v $(pwd)/ansible:/ansible edu/ansible:1.0 ansible-playbook laptop.yml									#	correr el playbook con el volumen
