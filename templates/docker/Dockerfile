
#设置基础镜像，镜像没有标签，默认为lastest标签，但是当镜像需要更新时，lastest标签会指向不同的镜像，导致构建失败，所以最好指定镜像标签
FROM thub.autohome.com.cn/bdp_platform/nginx:1.15.3
#将当前编译目录下的dist文件夹里的内容，拷贝到/usr/share/nginx/html这个目录下
COPY ./nginx.conf /etc/nginx/conf.d/

#将当前编译目录下的dist文件夹里的内容，拷贝到/usr/share/nginx/html这个目录下
COPY ./dist/ /usr/share/nginx/html

#设置镜像暴露端口，记录容器启动时监听哪些端口
EXPOSE 80
#设置容器的启动命令，只能有一条cmd命令；容器中进程的COMMAND为"nginx -g 'daemon off" ，当启动一个container时默认运行的命令，如果在启动container时赋予了command的话，那么定义的CMD中的命令将不会被执行，而会去执行command的命令
CMD ["nginx", "-g", "daemon off;"]
