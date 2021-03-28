class Trie {
    constructor() {
        this.characters = {};
        this.isWord = false;
    }
    addWord(word, index = 0) {
        if (index === word.length) {
            this.isWord = true;
        } else if (index < word.length) {
            const char = word[index];
            const subTrie = this.characters[char] || new Trie();
            subTrie.addWord(word, index + 1);
            this.characters[char] = subTrie;
        }
        return this;
    }

    findWord(word, index = 0) {
        const char = word[index];
        if (index < word.length - 1 && this.characters[char]) {
            index += 1;
            return this.characters[char].findWord(word, index);
        } else {
            return this.characters[char];
        }
    }
    getWords(words = [], currentWord = "") {
        if (this.isWord) words.push(currentWord);
        for (const char in this.characters) {
            const nextWord = currentWord + char;
            this.characters[char].getWords(words, nextWord);
        }
        return words;
    }
    autoComplete(prefix, words = [], currentWord = "") {
        if (this.isWord) {
            words.push(currentWord);
        }
        let tree = this
        for (let i = 0; i < prefix.length; i++) {
            if (tree.characters[prefix[i]] && i === prefix.length - 1) {
                currentWord += prefix[i];
                words = tree.characters[prefix[i]].getWords(words, currentWord);
            } else if (tree.characters[prefix[i]]) {
                currentWord += prefix[i];
                if (tree.characters[prefix[i]].isWord) {
                    words.push(currentWord);
                }
                tree = tree.characters[prefix[i]];
            } else {
                break;
            }
        }
        return words;
    }
}

export default Trie;