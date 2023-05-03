﻿// <auto-generated />
using System;
using FamilyFastFoodFrontendApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FamilyFastFoodFrontendApi.Migrations
{
    [DbContext(typeof(FamilyFastFoodFrontendApiContext))]
    [Migration("20230502135955_mssql.local_migration_332")]
    partial class mssqllocal_migration_332
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FamilyFastFoodFrontendApi.DataModels.Ingredients", b =>
                {
                    b.Property<int>("IngredientID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IngredientID"));

                    b.Property<int?>("Calcium")
                        .HasColumnType("int");

                    b.Property<int>("Calories")
                        .HasColumnType("int");

                    b.Property<int?>("Cholesterol")
                        .HasColumnType("int");

                    b.Property<int?>("DietaryFiber")
                        .HasColumnType("int");

                    b.Property<string>("IngredientName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Iron")
                        .HasColumnType("int");

                    b.Property<int>("Protein")
                        .HasColumnType("int");

                    b.Property<int>("RecipeID")
                        .HasColumnType("int");

                    b.Property<int?>("SaturatedFat")
                        .HasColumnType("int");

                    b.Property<int?>("Sodium")
                        .HasColumnType("int");

                    b.Property<int?>("Sugars")
                        .HasColumnType("int");

                    b.Property<int>("TotalCarbohydrates")
                        .HasColumnType("int");

                    b.Property<int>("TotalFat")
                        .HasColumnType("int");

                    b.Property<int?>("TransFat")
                        .HasColumnType("int");

                    b.Property<int?>("VitaminA")
                        .HasColumnType("int");

                    b.Property<int?>("VitaminC")
                        .HasColumnType("int");

                    b.HasKey("IngredientID");

                    b.HasIndex("RecipeID");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("FamilyFastFoodFrontendApi.DataModels.Recipes", b =>
                {
                    b.Property<int>("RecipeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RecipeID"));

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cuisine")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PrepTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RecipeTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ServingSize")
                        .HasColumnType("int");

                    b.Property<string>("Tags")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TotalTime")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RecipeID");

                    b.ToTable("Recipes");
                });

            modelBuilder.Entity("FamilyFastFoodFrontendApi.DataModels.Ingredients", b =>
                {
                    b.HasOne("FamilyFastFoodFrontendApi.DataModels.Recipes", "Recipe")
                        .WithMany()
                        .HasForeignKey("RecipeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipe");
                });
#pragma warning restore 612, 618
        }
    }
}