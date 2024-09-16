<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        return response()->json( Product::all(), 200);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name'=> 'required|max:255',
            'description'=> 'required',
            'price'=> 'required|numeric',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(string $id){
        $product = Product::find($id);

        if($product){
            return response()->json($product, 200);
        }
        
        return response()->json(['message'=> 'Product not Found'], 404);
        
    }

    public function update(Request $request, string $id){
        $product = Product::find($id);

        if (!$product){
            return response()->json(['message'=> 'Product not Found'], 404);
        }

        $validated = $request->validate([
            'name'=> 'required|max:255',
            'description'=> 'required',
            'price'=> 'required|numeric',
        ]);

        $product ->update($validated);
        return response()->json($product, 200);
    }

    public function destroy(Product $product){
        if($product){
            $product->delete();
            return response()->json('Deleted', 200);
        }
        return response()->json(['message'=> 'Product not Found']);
        
    }
}
