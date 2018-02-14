cd build/
echo "Renaming index file"
mv index.html 200.html
echo "Pushing files to surge"
surge ./ instify-web.surge.sh
