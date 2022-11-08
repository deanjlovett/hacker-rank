# alias
# aliases
alias a=alias
a h=history
a hgl="h|grep git|less"
a hggl="h|grep git|less"
a hggrl="h|grep git|sort -r | less"
a hgglr="h|grep git|sort -r | less"
a hglr="h|grep git|sort -r | less"

a dir="ls -alF"

a add="git add"
a gadd="git add"
a status="git status"
a gstatus="git status"
a commit="git commit"
a gcommit="git commit"
a push="git push"
a gpush="git push"

func_mcd(){
    mkdir $1;
    cd $1
}
a mcd=func_mcd

a hga=func_hga
func_hga(){
   h | grep $*
}

a hgal=func_hgal
func_hgal(){
   h | grep $* | less
}

a gitacp=func_gitacp
func_gitacp(){
   echo . 
   echo . git is about add,commit, then push
   read -p "Do you wish to shot yourself in the foot?" yn
   case $yn in
      [Yy]* ) git add $*;git commit -m 'adds initial files';git push -u origin master;;
      [Nn]* ) exit;;
      * ) exit;;
   esac
}
export MGDB=/Users/deanlovett/data/db
a smg="mongod --dbpath=/Users/deanlovett/data/db"
#
# git hints
#
# git status
# git add blah
# git commit -m 'adds something'
# git push -u origin master



pathmunge () {
    case ":${PATH}:" in
        *:"$1":*)
            echo .
            echo .  $1 already in path. Ignoring request to add it to the PATH.
            echo .
            ;;
        *)
            if [ "$2" = "after" ] ; then
                PATH=$PATH:$1
            else
                PATH=$1:$PATH
            fi
    esac
}

pathmunge /usr/local/mongodb/bin after


# add git bash completion
#[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
#
#export NVM_DIR=~/.nvm
#source $(brew --prefix nvm)/nvm.sh

#
# The color designators are as follows:
#
#                           a     black
#                           b     red
#                           c     green
#                           d     brown
#                           e     blue
#                           f     magenta
#                           g     cyan
#                           h     light grey
#                           A     bold black, usually shows up as dark grey
#                           B     bold red
#                           C     bold green
#                           D     bold brown, usually shows up as yellow
#                           E     bold blue
#                           F     bold magenta
#                           G     bold cyan
#                           H     bold light grey; looks like bright white
#                           x     default foreground or background
#
#
#                         ls Attribute  
#                                       Foreground color    
#                                           Background color
#                                               color
# +---------------------- directory     e   x   blue
# |                       symbolic      f   x   magenta
# |   +------------------ socket        c   x   green
# |   |                   pipe          d   x   brown
# |   |   +-------------- executable    b   x   red
# |   |   |               block         e   g   blue  on cyan
# |   |   |   +---------- character     e   d   blue  on brown
# |   |   |   |           executable    a   b   black on red
# |   |   |   |   +------ executable    a   g   black on cyan  
# |   |   |   |   |       directory     a   c   black on 
# |   |   |   |   |   +-- directory     a   d   black on  
# |   |   |   |   |   |
# exfxcxdxbxegedabagacad


export CLICOLOR=1
export LSCOLORS=gxFxcxdxbxegedabagacad

export HISTFILESIZE=1000000
export HISTSIZE=1000000

#export PS1="[\W] \! \$ "


# 31 red
# 32 green
# 33 yellow = red + green
# 34 blue
# 35 purple = blue + red
# 36 cyan   = blue + green

#export PS1="[\W] \e[0;31m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m \! \$ "
#export PS1="[\W] \e[0;32m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m \! \$ "
#export PS1="[\W] \e[0;33m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m \! \$ "
#export PS1="[\W] \e[0;34m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m \! \$ "
#export PS1="[\W] \e[0;35m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m \! \$ "
#export PS1="[\W] \e[0;36m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m \! \$ "

###########################################
# // YYYY-MM-DD // HH:MM:SS // git branch: {if any} 
# [ current folder ]  
# history number $ 
#
# // 2022-09-11 // 15:52:38 // git branch: 
# [~]  
# 96 $ 
#
#export PS1="\n\e[0;36m\\D{// %F // %T //}\e[m git branch: \e[0;32m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m\n[\W]  \n\! \$ "


# // YYYY-MM-DD // HH:MM:SS // git branch: {if any} 
# [ current folder ]  
# [ full path ]  
# history number $ 
#
# // 2022-09-11 // 15:52:38 // git branch: 
# [~]  
# [~]  
# 96 $ 
#
export PS1="\n\e[0;36m\\D{// %F // %T //}\e[m git branch: \e[0;32m\$(git branch 2>/dev/null | grep '^*'| colrm 1 2)\e[m\n[\w]  \n[\W]  \n\! \$ "



##
# Your previous /Users/deanlovett/.bash_profile file was backed up as /Users/deanlovett/.bash_profile.macports-saved_2019-06-24_at_21:55:26
##

# MacPorts Installer addition on 2019-06-24_at_21:55:26: adding an appropriate PATH variable for use with MacPorts.


# export PATH="/Applications:/opt/local/bin:/opt/local/sbin:$PATH"


pathmunge /Applications
pathmunge /opt/local/bin
pathmunge /opt/local/sbin

echo .
echo PATH = ...
echo $PATH
echo .

# Finished adapting your PATH environment variable for use with MacPorts.