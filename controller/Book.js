const Book=require('../Models/Book')



exports.CreateBook = async (req, res) => {
    const { Book_ID, Book_Title, Author_Name, Edition, pages, cost,Name_Of_Supplier, No_Of_Books } = req.body;

    if(!Book_ID||!Book_Title||!Author_Name||!Edition||!pages ||! cost || !Name_Of_Supplier || !No_Of_Books)
    {
        return res.json({
            message:"All Fileds are mandatory"
        }
         
        )
    }

    

    try {
        const newBook = await Book.create({
            Book_ID: Book_ID,
            Book_Title: Book_Title,
            Author_Name: Author_Name,
            Edition: Edition,
            pages: pages,
            cost:cost,
            Name_Of_Supplier: Name_Of_Supplier,
            No_Of_Books: No_Of_Books,
        });
  
        
        return res.status(200).json({
            message: "Book successfully created",
            newBook
        });
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
};

exports.getallbooks = async (req, res) => {
    try {
        const allBooks = await Book.find();

        res.status(200).json({
            success: true,
            message: "All Books",
            Books: allBooks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deletebook = async (req, res) => {
    try {
        const { BookId } = req.body;

        const book = await Book.findOneAndDelete({ Book_ID: BookId });

        if (!book) {
            return res.status(404).json({ message: "No Such Book Found" });
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getsinglebook = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        let book;
        if (!isNaN(searchTerm)) {
            
            book = await Book.findOne({ Book_ID: searchTerm });
        } else if (typeof searchTerm === 'string') {
    
            const regexSearchTerm = searchTerm.toString();
            book = await Book.findOne({ Book_Title: { $regex: regexSearchTerm, $options: 'i' } });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid search term"
            });
        }

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "No Book Found"
            });
        }

        res.status(200).json({
            success: true,
            book,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
