cd build/
echo "Renaming index file"
mv index.html 200.html
echo "Pushing files to surge"
surge ./ instify-web.surge.sh
echo "Reverting name of index file"
mv 200.html index.html
