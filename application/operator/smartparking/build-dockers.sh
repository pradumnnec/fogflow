VERSION=1.0

for d in */ ; do
    d=${d::${#d}-1}
    echo "$d"
    (cd $d ; docker build . -f dockerfile_staged -t fogflow/$d:$VERSION -t fogflow/$d);
done

